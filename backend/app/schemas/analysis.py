from pydantic import BaseModel

class CodeRequest(BaseModel):
    code: str
    
class AnalysisiReponse(BaseModel):
    result: dict    