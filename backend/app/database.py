from sqlalchemy import create_engine, Column, String, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./papers.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class ResearchPaper(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    summary = Column(Text)
    link = Column(String, unique=True)
    embedding = Column(Text)  # Store embeddings for FAISS

Base.metadata.create_all(bind=engine)
