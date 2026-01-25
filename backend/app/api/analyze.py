from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from app.services.code_analyzer import analyze_code

router=APIRouter()

    
@router.post("/analyze-file")
async def analyze_file(file: UploadFile=File(...)):
    content=await file.read()
    code=content.decode("utf-8")
    
    result=analyze_code(code)
    
    return{
        "filename": file.filename,
        "analysis": result
    }