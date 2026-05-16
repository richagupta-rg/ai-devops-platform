from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend.app.services.code_analyzer import analyze_code
from backend.app.db.database import get_db
from backend.app.db.models import Analysis
import json
from backend.app.schemas.analysis import CodeRequest

router = APIRouter()


# @router.post("/analyze-file")
# async def analyze_file(file: UploadFile = File(...)):
#     content = await file.read()
#     code = content.decode("utf-8")

#     result = analyze_code(code)

#     return {"filename": file.filename, "analysis": result}

# @router.post("/analyze")
# def analyze(code: str, db: Session = Depends(get_db)):
#     result = analyze_code(code)

#     db_entry = Analysis(
#         code=code,
#         result=json.dumps(result)
#     )
#     db.add(db_entry)
#     db.commit()
#     db.refresh(db_entry)

#     return {"result": result}

@router.post("/analyze")
def analyze(payload: CodeRequest, db: Session=Depends(get_db)):
    
    result = analyze_code(payload.code)
    
    db_entry = Analysis(
        code=payload.code,
        result=str(result)
    )
    
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    
    return {"result": result}