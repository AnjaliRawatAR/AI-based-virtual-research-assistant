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
