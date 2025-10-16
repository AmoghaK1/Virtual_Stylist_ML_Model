import os
from typing import Optional

import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv


def _ensure_configured() -> None:
    """Configure Cloudinary from environment variables if not already configured."""
    # Load .env so local dev works
    load_dotenv()
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
    api_key = os.getenv("CLOUDINARY_API_KEY")
    api_secret = os.getenv("CLOUDINARY_API_SECRET")

    if not (cloud_name and api_key and api_secret):
        raise RuntimeError(
            "Cloudinary environment variables are missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        )

    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret,
        secure=True,
    )


def upload_image_sync(file_path: Optional[str] = None, file_bytes: Optional[bytes] = None, public_id: Optional[str] = None) -> dict:
    """
    Upload an image to Cloudinary.

    Provide either file_path or file_bytes. Returns Cloudinary upload result dict.
    """
    _ensure_configured()

    if not file_path and not file_bytes:
        raise ValueError("Either file_path or file_bytes must be provided")

    upload_source = file_path if file_path else file_bytes
    result = cloudinary.uploader.upload(
        upload_source,
        public_id=public_id,
        resource_type="image",
        folder=os.getenv("CLOUDINARY_FOLDER", "wardrobe"),
        overwrite=False,
    )
    return result


def build_optimized_url(public_id: str) -> str:
    """Build an optimized Cloudinary delivery URL for the given public_id."""
    _ensure_configured()
    return cloudinary.CloudinaryImage(public_id).build_url(fetch_format="auto", quality="auto")


def build_autocrop_square_url(public_id: str, size: int = 500) -> str:
    _ensure_configured()
    return cloudinary.CloudinaryImage(public_id).build_url(crop="auto", gravity="auto", width=size, height=size)
