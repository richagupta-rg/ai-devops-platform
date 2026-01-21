from fastapi import APIRouter
from pydantic import BaseModel
from app.services.code_analyzer import analyze_code

router=APIRouter()

class CodeInput(BaseModel):
    code: str
    
@router.post("/analyze")
def analyze(input: CodeInput):
    result=analyze_code(input.code)
    return result    