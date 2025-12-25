import pandas as pd
from fastapi import HTTPException

MICRO_THRESHOLD = 10.0
MICRO_WINDOW_DAYS = 30


def analyze_behavior(df: pd.DataFrame) -> dict:
    """
    Lightweight, explainable behavior analysis for MVP.
    Assumes single-user uploaded CSV.
    """

    # =====================================================
    # 1️⃣ REQUIRED COLUMN VALIDATION
    # =====================================================
    required_cols = ["Date", "Amount"]

    missing = [col for col in required_cols if col not in df.columns]
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Required column(s) missing: {', '.join(missing)}"
        )

    # =====================================================
    # 2️⃣ BASIC CLEANING & SANITY CHECKS
    # =====================================================
    df = df.copy()

    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df["Amount"] = pd.to_numeric(df["Amount"], errors="coerce")

    if df["Date"].isna().all():
        raise HTTPException(
            status_code=400,
            detail="Date column exists but contains no valid date values."
        )

    if df["Amount"].isna().all():
        raise HTTPException(
            status_code=400,
            detail="Amount column exists but contains no valid numeric values."
        )

    df = df.dropna(subset=["Date", "Amount"])

    # =====================================================
    # 3️⃣ TRANSACTION TYPE NORMALIZATION
    # =====================================================
    if "Type" not in df.columns:
        df["Type"] = "expense"   # safe default for MVP

    df["Type"] = (
        df["Type"]
        .fillna("")
        .astype(str)
        .str.lower()
        .apply(
            lambda x: "expense" if ("exp" in x or "debit" in x)
            else "income" if ("inc" in x or "credit" in x or "salary" in x)
            else "other"
        )
    )

    # =====================================================
    # 4️⃣ OVESPENDING
    # =====================================================
    total_expense = df[df["Type"] == "expense"]["Amount"].sum()
    total_income = df[df["Type"] == "income"]["Amount"].sum()

    overspending = (
        total_expense > total_income
        if total_income > 0
        else True
    )

    # =====================================================
    # 5️⃣ MICRO-SPENDING (LAST 30 DAYS)
    # =====================================================
    latest_date = df["Date"].max()
    window_start = latest_date - pd.Timedelta(days=MICRO_WINDOW_DAYS)

    micro_mask = (
        (df["Type"] == "expense") &
        (df["Date"].between(window_start, latest_date)) &
        (df["Amount"] < MICRO_THRESHOLD)
    )

    micro_count = int(micro_mask.sum())
    micro_spender = micro_count > 20

    # =====================================================
    # 6️⃣ SUBSCRIPTION CREEP
    # =====================================================
    subscription_creep = False
    recurring_merchants = 0

    if "Merchant" in df.columns:
        df["Merchant"] = df["Merchant"].fillna("Unknown").astype(str)
        df["YearMonth"] = df["Date"].dt.to_period("M")

        recurring = (
            df[df["Type"] == "expense"]
            .groupby("Merchant")["YearMonth"]
            .nunique()
        )

        recurring_merchants = int((recurring >= 3).sum())
        subscription_creep = recurring_merchants > 5

    # =====================================================
    # 7️⃣ PRESENT BIAS (POST-PAYDAY SPENDING)
    # =====================================================
    present_bias = False
    payday_ratio = 0.0

    income_dates = df[df["Type"] == "income"]["Date"]

    if not income_dates.empty:
        last_income = income_dates.max()

        post_pay_spend = df[
            (df["Type"] == "expense") &
            (df["Date"].between(last_income, last_income + pd.Timedelta(days=7)))
        ]["Amount"].sum()

        month_total = df[
            (df["Type"] == "expense") &
            (df["Date"].dt.to_period("M") == last_income.to_period("M"))
        ]["Amount"].sum()

        if month_total > 0:
            payday_ratio = float(post_pay_spend / month_total)
            present_bias = payday_ratio > 0.5

    # =====================================================
    # 8️⃣ HUMAN-READABLE INSIGHTS
    # =====================================================
    insights = []

    if overspending:
        insights.append("Overspending detected")
    if micro_spender:
        insights.append("Frequent small purchases detected")
    if subscription_creep:
        insights.append("Multiple recurring monthly subscriptions detected")
    if present_bias:
        insights.append("High spending immediately after payday detected")

    # =====================================================
    # 9️⃣ FINAL RESPONSE
    # =====================================================
    return {
        "overspending": overspending,
        "micro_spender": micro_spender,
        "subscription_creep": subscription_creep,
        "present_bias": present_bias,

        "micro_transactions_last_30_days": micro_count,
        "recurring_merchants": recurring_merchants,

        "total_expense": round(float(total_expense), 2),
        "total_income": round(float(total_income), 2),
        "payday_spike_ratio": round(payday_ratio, 3),

        "insight_summary": (
            " | ".join(insights)
            if insights
            else "No major behavioral risks detected"
        )
    }
