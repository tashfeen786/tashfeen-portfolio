from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.config import GROQ_API_KEY, GROQ_MODEL
from app.core.rag import build_prompt
import groq
import asyncio

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    system, user = build_prompt(req.message)
    
    def _call_groq():
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
        return completion.choices[0].message.content

    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, _call_groq)
        return ChatResponse(response=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))