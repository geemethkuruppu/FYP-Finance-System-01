import joblib
from sentence_transformers import SentenceTransformer

# Load classical models
tfidf = joblib.load("models/tfidf.pkl")
svd = joblib.load("models/svd.pkl")
kmeans = joblib.load("models/kmeans.pkl")

# Load SBERT
sbert = SentenceTransformer("all-MiniLM-L6-v2")
