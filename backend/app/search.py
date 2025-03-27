import requests
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, ResearchPaper
from embeddings import generate_embeddings
from faiss_index import update_faiss_index

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/search/")
def search_papers(query: str, db: Session = Depends(get_db)):
    """Fetch papers from arXiv and store in DB"""
    url = f"http://export.arxiv.org/api/query?search_query=all:{query}&max_results=5"
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch papers")

    papers = parse_arxiv_response(response.text)

    for paper in papers:
        # Check if already exists
        existing_paper = db.query(ResearchPaper).filter(ResearchPaper.link == paper["link"]).first()
        if not existing_paper:
            embedding = generate_embeddings(paper["summary"])
            new_paper = ResearchPaper(
                title=paper["title"],
                summary=paper["summary"],
                link=paper["link"],
                embedding=str(embedding.tolist())
            )
            db.add(new_paper)
            db.commit()
            update_faiss_index(new_paper.id, embedding)

    return {"papers": papers}

def parse_arxiv_response(response_text):
    """Extract title, summary, and link from arXiv API response"""
    import xml.etree.ElementTree as ET
    root = ET.fromstring(response_text)
    papers = []
    for entry in root.findall(".//{http://www.w3.org/2005/Atom}entry"):
        papers.append({
            "title": entry.find("{http://www.w3.org/2005/Atom}title").text,
            "summary": entry.find("{http://www.w3.org/2005/Atom}summary").text,
            "link": entry.find("{http://www.w3.org/2005/Atom}id").text
        })
    return papers

'''
import requests
import xml.etree.ElementTree as ET

def search_papers(query, page=1, page_size=5):
    """Search for papers using ArXiv API"""
    arxiv_url = f"http://export.arxiv.org/api/query?search_query=all:{query}&max_results={page_size}&start={(page-1)*page_size}"
    response = requests.get(arxiv_url)

    if response.status_code != 200:
        return {"error": "Failed to fetch papers"}

    root = ET.fromstring(response.text)
    papers = []
    
    for entry in root.findall("{http://www.w3.org/2005/Atom}entry"):
        title = entry.find("{http://www.w3.org/2005/Atom}title").text
        summary = entry.find("{http://www.w3.org/2005/Atom}summary").text
        link = entry.find("{http://www.w3.org/2005/Atom}id").text

        papers.append({"title": title, "summary": summary, "link": link})

    return {"arxiv_results": papers}
'''

'''
import requests
import os
from dotenv import load_dotenv

# Load API keys from .env file
load_dotenv()
# SEMANTIC_SCHOLAR_API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")

def search_papers(query, page=1, page_size=5):
    """Search for papers using ArXiv and Semantic Scholar APIs"""
    
    # ArXiv API (No API key required)
    arxiv_url = f"http://export.arxiv.org/api/query?search_query=all:{query}&max_results={page_size}&start={(page-1)*page_size}"
    arxiv_response = requests.get(arxiv_url)
    
    # # Semantic Scholar API (Requires API key)
    # semantic_url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={query}&limit={page_size}"
    # headers = {"x-api-key": SEMANTIC_SCHOLAR_API_KEY}
    # semantic_response = requests.get(semantic_url, headers=headers)

    return {
        "arxiv_results": arxiv_response.text if arxiv_response.status_code == 200 else "Error"
        # "semantic_results": semantic_response.json() if semantic_response.status_code == 200 else "Error"
    }
'''