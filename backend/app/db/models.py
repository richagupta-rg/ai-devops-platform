from sqlalchemy import Column, Integer, String, JSON
from backend.app.db.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(JSON)
    result = Column(JSON)
    username=Column(String)
    
class User(Base):
    __tablename__="users"
    
    id=Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password=Column(String)    