from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd

from utilities.file_handler import validate_csv_file, save_csv_file
from services.behavior_service import analyze_behavior

router = APIRouter(prefix="/api")

@router.post("/behavior-analysis")
async def behavior_analysis(file: UploadFile = File(...)):
    try:
        validate_csv_file(file)
        file_path = save_csv_file(file)

        df = pd.read_csv(file_path)
        result = analyze_behavior(df)

        return {
            "message": "Behavior analysis completed",
            "behavior_analysis": result
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Behavior analysis failed: {str(e)}"
        )
