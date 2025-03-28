from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, User
from passlib.context import CryptContext
# from search import search_papers
# from summarizer import generate_summary

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/auth/signup")
def signup(name: str, email: str, password: str, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(password)
    user = User(name=name, email=email, password=hashed_password)
    db.add(user)
    try:
        db.commit()
        db.refresh(user)
    except:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User created successfully"}

@router.post("/auth/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user": {"id": user.id, "name": user.name, "email": user.email}}









# @router.get("/search/")
# async def search(query: str, page: int = 1, page_size: int = 5):
#     """Search for research papers"""
#     results = search_papers(query, page, page_size)
#     if not results["arxiv_results"]: # and not results["semantic_results"]:
#         raise HTTPException(status_code=404, detail="No papers found")
#     return results

# @router.get("/summarize/")
# async def summarize(text: str):
#     """Generate a summary of a paper"""
#     summary = generate_summary(text)
#     if not summary:
#         raise HTTPException(status_code=500, detail="Error generating summary")
#     return {"summary": summary}
