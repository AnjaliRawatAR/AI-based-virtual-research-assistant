from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./papers.db"  # Update this to your database URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# class ResearchPaper(Base):
#     __tablename__ = "papers"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     summary = Column(Text)
#     link = Column(String, unique=True)
#     embedding = Column(Text)  # Store embeddings for FAISS

# Base.metadata.create_all(bind=engine)
