from fastapi import FastAPI
from routes.upload_routes import router as upload_router
from routes.behavior_routes import router as behavior_router
from routes.process_routes import router as process_router

app = FastAPI(
    title="PFM MVP Backend",
    description="Minimum Viable Backend for CSV Upload & Processing",
    version="1.0.0"
)

app.include_router(process_router)
