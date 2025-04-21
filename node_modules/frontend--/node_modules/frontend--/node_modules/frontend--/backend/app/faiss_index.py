import faiss
import numpy as np
from database import SessionLocal, ResearchPaper

index = faiss.IndexFlatL2(768)  # 768-D vector for embeddings

def update_faiss_index(paper_id, embedding):
    """Update FAISS index with new research paper"""
    vector = np.array(embedding, dtype=np.float32).reshape(1, -1)
    index.add(vector)

def search_faiss(query_embedding):
    """Retrieve top research papers based on query embedding"""
    query_vector = np.array(query_embedding, dtype=np.float32).reshape(1, -1)
    distances, indices = index.search(query_vector, 5)  # Get top 5 results
    db = SessionLocal()
    results = [db.query(ResearchPaper).filter_by(id=int(idx)).first() for idx in indices[0]]
    return results

'''
import faiss
import numpy as np
import os
from app.embeddings import get_embedding

# FAISS index storage path
INDEX_PATH = "faiss_store/index.faiss"

# Load FAISS index or create a new one
if os.path.exists(INDEX_PATH):
    index = faiss.read_index(INDEX_PATH)
else:
    index = faiss.IndexFlatL2(384)  # 384-dimensional vectors

# Store paper metadata (IDs and Titles)
paper_data = []

def add_paper_to_index(paper_id, title, text):
    """Add a research paper to FAISS index"""
    global index, paper_data
    embedding = get_embedding(text).reshape(1, -1)
    index.add(embedding)
    paper_data.append({"id": paper_id, "title": title})

    # Save index
    faiss.write_index(index, INDEX_PATH)
'''