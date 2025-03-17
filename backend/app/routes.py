from fastapi import APIRouter, HTTPException
from app.search import search_papers
from app.summarizer import generate_summary

router = APIRouter()

@router.get("/search/")
async def search(query: str, page: int = 1, page_size: int = 5):
    """Search for research papers"""
    results = search_papers(query, page, page_size)
    if not results["arxiv_results"] and not results["semantic_results"]:
        raise HTTPException(status_code=404, detail="No papers found")
    return results

@router.get("/summarize/")
async def summarize(text: str):
    """Generate a summary of a paper"""
    summary = generate_summary(text)
    if not summary:
        raise HTTPException(status_code=500, detail="Error generating summary")
    return {"summary": summary}
