import os
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr, Field
from backend.services import cloudinary_service
from starlette.concurrency import run_in_threadpool


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: load env and create Mongo client
    load_dotenv()
    mongo_uri = os.getenv("MONGODB_URI")
    if not mongo_uri:
        raise RuntimeError("MONGODB_URI is not set in environment.")

    app.state.mongo_client = AsyncIOMotorClient(mongo_uri)

    # Ensure indices on collections
    db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
    db = app.state.mongo_client[db_name]
    try:
        await db.users.create_index("email", unique=True)
        await db["user-preferences"].create_index("userId", unique=True)
        await db["wardrobe"].create_index([("userId", 1), ("createdAt", -1)])
    except Exception:
        # Index may already exist or Mongo may be unreachable at startup; ignore here.
        pass

    # Yield control to the application
    try:
        yield
    finally:
        # Shutdown: close client
        client = getattr(app.state, "mongo_client", None)
        if client is not None:
            client.close()


app = FastAPI(lifespan=lifespan)

# Allow frontend dev server to call the API (Vite default ports)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.get("/")
def read_root():
	return {"status": "ok"}


class RegisterRequest(BaseModel):
	name: str = Field(min_length=1)
	email: EmailStr
	age: int = Field(ge=13, le=120)
	gender: str
	location: str
	password: str = Field(min_length=6)


@app.post("/api/auth/register")
async def register_user(payload: RegisterRequest):
	"""Register a new user, ensuring unique email, and store in MongoDB."""
	# Choose database name from env with sensible default
	db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
	db = app.state.mongo_client[db_name]

	email = payload.email.lower()

	# Check if user already exists
	existing = await db.users.find_one({"email": email})
	if existing:
		raise HTTPException(status_code=409, detail="Email already registered")

	# Hash password (bcrypt)
	try:
		import bcrypt
	except ImportError:
		raise HTTPException(status_code=500, detail="Server missing bcrypt dependency")

	hashed_pw = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

	doc = {
		"name": payload.name,
		"email": email,
		"age": payload.age,
		"gender": payload.gender,
		"location": payload.location,
		"passwordHash": hashed_pw,
		"isComplete": False,
		"createdAt": datetime.utcnow(),
		"updatedAt": datetime.utcnow(),
	}

	result = await db.users.insert_one(doc)
	return {"ok": True, "id": str(result.inserted_id), "isComplete": False}


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@app.post("/api/auth/login")
async def login_user(payload: LoginRequest):
    """Login user by verifying email and password."""
    # Choose database name from env with sensible default
    db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
    db = app.state.mongo_client[db_name]

    email = payload.email.lower()

    # Find user by email
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verify password
    try:
        import bcrypt
    except ImportError:
        raise HTTPException(status_code=500, detail="Server missing bcrypt dependency")

    if not bcrypt.checkpw(payload.password.encode("utf-8"), user["passwordHash"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Return user info (excluding password hash)
    return {
        "ok": True,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "age": user["age"],
            "gender": user["gender"],
            "location": user["location"],
            "isComplete": user.get("isComplete", False)
        }
    }


class CompleteProfileRequest(BaseModel):
    userId: str
    height: int = Field(ge=120, le=250)
    weight: int = Field(ge=30, le=200)
    body_type: str = Field(pattern="^(slim|average|broad)$")
    skin_tone: str
    hair_color: str = Field(pattern="^(black|brown|blonde|red|gray|white)$")
    favourite_colors: list[str]
    disliked_colors: list[str]


@app.post("/api/profile/complete")
async def complete_profile(payload: CompleteProfileRequest):
    """Complete user profile with physical attributes and preferences. Stores data in user-preferences collection."""
    # Choose database name from env with sensible default
    db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
    db = app.state.mongo_client[db_name]

    # Verify user exists
    try:
        from bson import ObjectId
        user_object_id = ObjectId(payload.userId)
        print(f"Looking for user with ID: {user_object_id}")
    except Exception as e:
        print(f"Invalid user ID format: {payload.userId}, Error: {e}")
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    user = await db.users.find_one({"_id": user_object_id})
    print(f"User found: {user is not None}")
    if not user:
        print(f"No user found with ID: {user_object_id}")
        # Let's also check if there are any users in the database
        user_count = await db.users.count_documents({})
        print(f"Total users in database: {user_count}")
        raise HTTPException(status_code=404, detail="User not found")

    # Prepare profile data for user-preferences collection
    preference_data = {
        "userId": user_object_id,
        "height": payload.height,
        "weight": payload.weight,
        "body_type": payload.body_type,
        "skin_tone": payload.skin_tone,
        "hair_color": payload.hair_color,
        "favourite_colors": payload.favourite_colors,
        "disliked_colors": payload.disliked_colors,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
    }

    # Check if preferences already exist for this user
    existing_preferences = await db["user-preferences"].find_one({"userId": user_object_id})
    
    if existing_preferences:
        # Update existing preferences
        preference_data["updatedAt"] = datetime.utcnow()
        await db["user-preferences"].update_one(
            {"userId": user_object_id}, 
            {"$set": preference_data}
        )
        # Also mark user as complete
        await db.users.update_one(
            {"_id": user_object_id},
            {"$set": {"isComplete": True, "updatedAt": datetime.utcnow()}}
        )
        return {"ok": True, "message": "User preferences updated successfully", "isComplete": True}
    else:
        # Create new preferences
        result = await db["user-preferences"].insert_one(preference_data)
        # Also mark user as complete
        await db.users.update_one(
            {"_id": user_object_id},
            {"$set": {"isComplete": True, "updatedAt": datetime.utcnow()}}
        )
        return {"ok": True, "message": "User preferences saved successfully", "preferenceId": str(result.inserted_id), "isComplete": True}

 


@app.post("/api/wardrobe")
async def add_wardrobe_item(
    userId: str = Form(...),
    type: str = Form(...),
    weather: str = Form(...),
    color: str = Form(...),
    occasion: str = Form(...),
    image: UploadFile = File(...),
):
    """Upload an image to Cloudinary and store wardrobe item in MongoDB."""
    # DB
    db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
    db = app.state.mongo_client[db_name]

    # Validate user
    from bson import ObjectId
    try:
        user_object_id = ObjectId(userId)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    user = await db.users.find_one({"_id": user_object_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Read image bytes
    file_bytes = await image.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty image file")

    # Upload to Cloudinary in thread pool
    public_id_hint = f"{userId}_{int(datetime.utcnow().timestamp())}"
    try:
        upload_result = await run_in_threadpool(lambda: cloudinary_service.upload_image_sync(file_bytes=file_bytes, public_id=public_id_hint))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {e}")

    image_url = upload_result.get("secure_url") or upload_result.get("url")
    public_id = upload_result.get("public_id")
    if not image_url:
        raise HTTPException(status_code=500, detail="Upload did not return a URL")

    doc = {
        "userId": user_object_id,
        "imageUrl": image_url,
        "publicId": public_id,
        "type": type,
        "weather": weather,
        "color": color,
        "occasion": occasion,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow(),
    }
    result = await db["wardrobe"].insert_one(doc)

    return {
        "ok": True,
        "id": str(result.inserted_id),
        "imageUrl": image_url,
    }


@app.get("/api/wardrobe")
async def list_wardrobe_items(
    userId: str = Query(...),
    color: str | None = Query(None),
    type: str | None = Query(None),
    weather: str | None = Query(None),
    occasion: str | None = Query(None),
):
    """List wardrobe items for a user with optional filters."""
    db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
    db = app.state.mongo_client[db_name]

    from bson import ObjectId
    try:
        user_object_id = ObjectId(userId)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    query: dict = {"userId": user_object_id}
    if color:
        query["color"] = color
    if type:
        query["type"] = type
    if weather:
        query["weather"] = weather
    if occasion:
        query["occasion"] = occasion

    cursor = db["wardrobe"].find(query).sort("createdAt", -1)
    items = []
    async for item in cursor:
        items.append({
            "id": str(item["_id"]),
            "imageUrl": item.get("imageUrl"),
            "type": item.get("type"),
            "weather": item.get("weather"),
            "color": item.get("color"),
            "occasion": item.get("occasion"),
        })

    return {"ok": True, "items": items}


@app.delete("/api/wardrobe/{item_id}")
async def delete_wardrobe_item(item_id: str, userId: str = Query(...)):
    """Delete a wardrobe item (and its Cloudinary image) by id for a user."""
    from bson import ObjectId
    # DB
    db_name = os.getenv("MONGODB_DB_NAME", "virtual_stylist")
    db = app.state.mongo_client[db_name]

    try:
        obj_id = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item id")

    try:
        user_object_id = ObjectId(userId)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id")

    item = await db["wardrobe"].find_one({"_id": obj_id, "userId": user_object_id})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Delete image from Cloudinary if present
    public_id = item.get("publicId")
    if public_id:
        try:
            await run_in_threadpool(lambda: cloudinary_service.delete_image(public_id))
        except Exception:
            # Ignore Cloudinary deletion failures, continue to delete DB doc
            pass

    # Delete document
    await db["wardrobe"].delete_one({"_id": obj_id})
    return {"ok": True}

if __name__ == "__main__":
	import uvicorn

	# Run the app on port 3000
	uvicorn.run("backend.server:app", host="0.0.0.0", port=3000)


