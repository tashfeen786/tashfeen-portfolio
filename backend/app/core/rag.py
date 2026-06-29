import os
from app.core.vector_store import build_store, retrieve

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def _load_chunks() -> list[dict]:
    chunks = []
    files = ["profile.txt", "projects.txt"]
    for fname in files:
        path = os.path.join(DATA_DIR, fname)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
        # Split by double newline but merge small chunks
        paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
        # Merge consecutive small paragraphs into bigger chunks
        merged, current = [], ""
        for para in paragraphs:
            if len(current) + len(para) < 800:
                current += (" " if current else "") + para
            else:
                if current:
                    merged.append(current)
                current = para
        if current:
            merged.append(current)
        for i, chunk in enumerate(merged):
            chunks.append({"id": f"{fname}-{i}", "text": chunk})
    return chunks

def init_rag():
    chunks = _load_chunks()
    build_store(chunks)

def build_prompt(question: str) -> str:
    context_chunks = retrieve(question, n=6)
    context = "\n\n---\n\n".join(context_chunks)

    return f"""You are Tashfeen Aziz's AI portfolio assistant. Your job is to answer questions about Tashfeen using the context provided below.

STRICT RULES:
- ALWAYS answer from the context. Never say "I don't have that info" if the answer exists in context.
- Speak in first person as if you ARE Tashfeen (e.g. "I built...", "My experience includes...")
- Be concise and confident. Max 3-4 sentences unless more detail is asked.
- If truly not in context, say: "That's not something I have details on — reach out at tashfeen247@gmail.com"
- Never hallucinate projects or experiences not in context.

CONTEXT:
{context}

QUESTION: {question}

ANSWER (as Tashfeen, first person, from context only):"""