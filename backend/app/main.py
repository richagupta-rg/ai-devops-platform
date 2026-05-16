# using FastAPI because it;s lightweighted, fast, and ideal for ML-backed APIs.
from backend.app.db.database import engine
from backend.app.db.models import Base
from backend.app.api.auth import router as auth_router
from fastapi import FastAPI
from backend.app.api.analyze import router as analyze_router


app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(analyze_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "AI DevOps Platform is ruunig"}
