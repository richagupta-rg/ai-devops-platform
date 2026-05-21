from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend.app.services.code_analyzer import analyze_code
from backend.app.db.database import get_db
from backend.app.db.models import Analysis
import json
from backend.app.schemas.analysis import CodeRequest
from backend.app.core.deps import get_current_user

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
def analyze(
    code: str,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    
    result = analyze_code(code)

    # AI Suggestions
    suggestions = []

    if result["complexity_score"] > 10:
        suggestions.append(
            "Complexity is high. Try simplifying logic."
        )

    if result["number_of_functions"] == 0:
        suggestions.append(
            "Consider organizing code into functions."
        )

    if result["lines_of_code"] > 50:
        suggestions.append(
            "Codebase is large. Consider modularization."
        )

    suggestions.append(
        "Follow PEP8 coding standards."
    )

    suggestions.append(
        "Add comments for better readability."
    )

    result["suggestions"] = suggestions

    db_entry = Analysis(
        code=code,
        result=result,
        username=current_user
    )

    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)

    return {"result": result}
    
    

@router.get("/my-analyses")
def get_my_analyses(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    analyses = db.query(Analysis).filter(
        Analysis.username == current_user
    ).all()

    return analyses