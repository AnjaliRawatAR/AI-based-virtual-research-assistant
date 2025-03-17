import requests
import os
from dotenv import load_dotenv

# Load API keys from .env file
load_dotenv()
SEMANTIC_SCHOLAR_API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")

def search_papers(query, page=1, page_size=5):
    """Search for papers using ArXiv and Semantic Scholar APIs"""
    
    # ArXiv API (No API key required)
    arxiv_url = f"http://export.arxiv.org/api/query?search_query=all:{query}&max_results={page_size}&start={(page-1)*page_size}"
    arxiv_response = requests.get(arxiv_url)
    
    # Semantic Scholar API (Requires API key)
    semantic_url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={query}&limit={page_size}"
    headers = {"x-api-key": SEMANTIC_SCHOLAR_API_KEY}
    semantic_response = requests.get(semantic_url, headers=headers)

    return {
        "arxiv_results": arxiv_response.text if arxiv_response.status_code == 200 else "Error",
        "semantic_results": semantic_response.json() if semantic_response.status_code == 200 else "Error"
    }
