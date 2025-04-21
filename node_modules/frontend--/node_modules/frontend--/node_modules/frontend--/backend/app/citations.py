# import requests

# def get_citations(paper_id):
#     """Retrieve citations for a research paper from Semantic Scholar"""
#     url = f"https://api.semanticscholar.org/graph/v1/paper/{paper_id}/citations"
#     response = requests.get(url)

#     if response.status_code == 200:
#         return response.json()
#     return {"error": "Unable to retrieve citations"}
