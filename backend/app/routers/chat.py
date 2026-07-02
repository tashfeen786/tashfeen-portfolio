from fastapi import APIRouter
from pydantic import BaseModel
from app.config import GROQ_API_KEY, GROQ_MODEL
from app.core.rag import build_prompt
import groq

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    system, user = build_prompt(req.message)
    client = groq.Groq(api_key=GROQ_API_KEY)
    completion = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        max_tokens=512,
        temperature=0.75,
    )
    return ChatResponse(response=completion.choices[0].message.content)