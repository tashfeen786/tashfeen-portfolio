from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.config import GROQ_API_KEY, GROQ_MODEL
from app.core.rag import build_prompt
import json
import groq

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

def stream_response(system: str, user: str):
    try:
        client = groq.Groq(api_key=GROQ_API_KEY)
        stream = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": system},
                {"role": "user",   "content": user},
            ],
            max_tokens=512,
            temperature=0.75,
            stream=True,
        )
        for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield f"data: {json.dumps({'token': delta})}\n\n"
        yield "data: [DONE]\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"

@router.post("/api/chat")
async def chat(req: ChatRequest):
    system, user = build_prompt(req.message)
    return StreamingResponse(
        stream_response(system, user),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )