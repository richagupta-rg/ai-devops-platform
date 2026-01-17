# using FastAPI because it;s lightweighted, fast, and ideal for ML-backed APIs.


from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def root():
    return {"message": "AI DevOps Platform is ruunig"}