# from search import search_papers
# from summarizer import generate_summary
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.database import SessionLocal, User
import uvicorn
from passlib.context import CryptContext

# Initialize FastAPI app
app = FastAPI(title="AI Research Assistant", description="Search, Summarize, and Cite Papers")

# Initialize password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (update for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Pydantic model for user signup validation
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Signup route
@app.post("/auth/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = pwd_context.hash(user.password)

    # Create new user entry
    new_user = User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}

@app.get("/")
def home():
    return {"message": "Welcome to the AI Research Assistant API"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

# @router.get("/search/")
# async def search(query: str, page: int = 1, page_size: int = 5):
#     """Search for research papers"""
#     results = search_papers(query, page, page_size)
#     if not results["arxiv_results"]: # and not results["semantic_results"]:
#         raise HTTPException(status_code=404, detail="No papers found")
#     return results


