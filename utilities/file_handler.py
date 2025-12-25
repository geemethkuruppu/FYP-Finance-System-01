import os
import uuid
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = [".csv"]
ALLOWED_MIME_TYPES = [
    "text/csv",
    "application/vnd.ms-excel"
]

os.makedirs(UPLOAD_DIR, exist_ok=True)


def validate_csv_file(file: UploadFile):
    # Check extension
    extension = os.path.splitext(file.filename)[1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Only CSV files are allowed."
        )

    # Check content type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload a valid CSV file."
        )


def save_csv_file(file: UploadFile) -> str:
    unique_name = f"{uuid.uuid4()}.csv"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path
