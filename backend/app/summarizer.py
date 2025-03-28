# import requests
# import os
# from dotenv import load_dotenv

# # Load API keys from .env file
# load_dotenv()
# HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# def generate_summary(text):
#     """Generate summary using Hugging Face API"""
    
#     url = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
#     headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
#     data = {"inputs": text}
    
#     response = requests.post(url, headers=headers, json=data)
    
#     return response.json()[0]["summary_text"] if response.status_code == 200 else "Error in summarization"
