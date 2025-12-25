from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import numpy as np

from utilities.file_handler import validate_csv_file, save_csv_file
from services.text_preprocess import clean_text
from services.model_loader import tfidf, svd, sbert, kmeans
from services.behavior_service import analyze_behavior

router = APIRouter(prefix="/api")

@router.post("/process-csv")
async def process_csv(file: UploadFile = File(...)):
    try:
        # ---------- File handling ----------
        validate_csv_file(file)
        file_path = save_csv_file(file)

        df = pd.read_csv(file_path)

        # ---------- CLUSTERING ----------
        df["clean_desc"] = clean_text(df)

        X_tfidf = tfidf.transform(df["clean_desc"])
        X_tfidf_reduced = svd.transform(X_tfidf)

        X_sbert = sbert.encode(
            df["clean_desc"].tolist(),
            convert_to_numpy=True,
            show_progress_bar=False
        )

        X = np.hstack([X_tfidf_reduced, X_sbert])
        df["ClusterID"] = kmeans.predict(X)

        cluster_distribution = (
            df["ClusterID"]
            .value_counts()
            .sort_index()
            .to_dict()
        )

        # ---------- BEHAVIOR ANALYSIS ----------
        behavior_result = analyze_behavior(df)

        # ---------- COMBINED RESPONSE ----------
        return {
            "message": "CSV processed successfully",
            "rows": len(df),
            "clusters_found": len(cluster_distribution),
            "cluster_distribution": cluster_distribution,
            "behavior_analysis": behavior_result
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Processing failed: {str(e)}"
        )
