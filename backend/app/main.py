from flask import Flask
from fastapi.middleware.cors import CORSMiddleware
from flask_cors import CORS 
from fastapi import FastAPI, HTTPException
from routes import router
import uvicorn
# from search import search_papers
# from summarizer import generate_summary

app = Flask(__name__)

app = FastAPI(title="AI Research Assistant", description="Search, Summarize, and Cite Papers")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include API routes
app.include_router(router)

@app.get("/")
def home():
    return {"message": "Welcome to the AI Research Assistant API"}

# @router.get("/search/")
# async def search(query: str, page: int = 1, page_size: int = 5):
#     """Search for research papers"""
#     results = search_papers(query, page, page_size)
#     if not results["arxiv_results"]: # and not results["semantic_results"]:
#         raise HTTPException(status_code=404, detail="No papers found")
#     return results

if __name__ == "__main__":
    uvicorn.run(app, port=8000)

