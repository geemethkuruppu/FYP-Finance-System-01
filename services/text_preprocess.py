import pandas as pd
import re
from services.schema_resolver import resolve_text_columns

def clean_text(df: pd.DataFrame) -> pd.Series:
    desc_col, merchant_col = resolve_text_columns(df)

    raw_text = ""

    if merchant_col:
        raw_text = df[merchant_col].fillna("").astype(str)

    if desc_col:
        raw_text = raw_text + " " + df[desc_col].fillna("").astype(str)

    clean_desc = (
        raw_text.str.lower()
        .str.replace(r"[^a-z0-9 ]+", " ", regex=True)
        .str.replace(r"\s+", " ", regex=True)
        .str.replace(r"\s+", " ", regex=True)
        .str.strip()
    )

    return clean_desc
