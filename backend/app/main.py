# using FastAPI because it;s lightweighted, fast, and ideal for ML-backed APIs.


from fastapi import FastAPI
from backend.app.api.analyze import router as analyze_router

app=FastAPI()
app.include_router(analyze_router)

@app.get("/")
def root():
    return {"message": "AI DevOps Platform is ruunig"}