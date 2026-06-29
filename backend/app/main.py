from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.routers import chat
from app.core.rag import init_rag

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up — building RAG vector store...")
    init_rag()
    print("Ready.")
    yield

app = FastAPI(title="Tashfeen Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://tashfeen.dev"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)

@app.get("/health")
def health():
    return {"status": "ok"}