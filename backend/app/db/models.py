from sqlalchemy import Column, Integer, String
from backend.app.db.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String)
    result = Column(String)