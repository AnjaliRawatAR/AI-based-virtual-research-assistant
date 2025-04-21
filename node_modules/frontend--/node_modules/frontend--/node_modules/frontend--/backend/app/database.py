from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./users.db"  

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define User model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

# Create the database tables
Base.metadata.create_all(bind=engine)

# class ResearchPaper(Base):
#     __tablename__ = "papers"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     summary = Column(Text)
#     link = Column(String, unique=True)
#     embedding = Column(Text)  # Store embeddings for FAISS

# Base.metadata.create_all(bind=engine)
