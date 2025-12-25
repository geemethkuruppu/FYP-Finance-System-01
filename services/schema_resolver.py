import pandas as pd
from fastapi import HTTPException

def resolve_text_columns(df: pd.DataFrame):
    """
    Resolve text columns from arbitrary CSV schemas.
    """

    desc_candidates = [
        "Transaction Description",
        "description",
        "details",
        "narration",
        "text"
    ]

    merchant_candidates = [
        "Merchant",
        "merchant",
        "vendor",
        "payee"
    ]

    desc_col = next((c for c in desc_candidates if c in df.columns), None)
    merchant_col = next((c for c in merchant_candidates if c in df.columns), None)

    if not desc_col and not merchant_col:
        raise HTTPException(
            status_code=400,
            detail="CSV must contain at least a transaction description or merchant column."
        )

    return desc_col, merchant_col
