def basic_preprocess(df):
    """
    MVP-level preprocessing:
    - Remove empty rows
    - Return cleaned dataframe
    """
    df = df.dropna(how="all")
    return df
