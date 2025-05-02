from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk

nltk.download('punkt')
from nltk.tokenize import sent_tokenize

model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_key_sentences(text, top_n=5):
    sentences = sent_tokenize(text)
    if len(sentences) == 0:
        return []

    embeddings = model.encode(sentences)
    similarity_matrix = cosine_similarity(embeddings)
    sentence_scores = similarity_matrix.sum(axis=1)

    top_indices = np.argsort(sentence_scores)[-top_n:][::-1]
    top_sentences = [sentences[i] for i in top_indices]
    return top_sentences
