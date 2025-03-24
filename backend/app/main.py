from fastapi import FastAPI
from routes import router
import uvicorn

app = FastAPI(title="AI Research Assistant", description="Search, Summarize, and Cite Papers")

# Include API routes
app.include_router(router)

@app.get("/")
def home():
    return {"message": "Welcome to the AI Research Assistant API"}

if __name__ == "__main__":
    uvicorn.run(app, port=8000)

