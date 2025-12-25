from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import numpy as np

from utilities.file_handler import validate_csv_file, save_csv_file
from services.text_preprocess import clean_text
from services.model_loader import tfidf, svd, sbert, kmeans

router = APIRouter(prefix="/api")

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    try:
        validate_csv_file(file)
        file_path = save_csv_file(file)

        df = pd.read_csv(file_path)

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

        cluster_dist = (
            df["ClusterID"]
            .value_counts()
            .sort_index()
            .to_dict()
        )

        return {
            "message": "CSV processed and clustered successfully",
            "rows": len(df),
            "clusters_found": len(cluster_dist),
            "cluster_distribution": cluster_dist
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Processing failed: {str(e)}"
        )
