from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="AI Research Assistant", description="Search, Summarize, and Cite Papers")

# Include API routes
app.include_router(router)

@app.get("/")
def home():
    return {"message": "Welcome to the AI Research Assistant API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

