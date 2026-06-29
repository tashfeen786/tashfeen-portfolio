from sentence_transformers import SentenceTransformer
from app.config import EMBED_MODEL

_model = None

def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        print(f"Loading embedding model: {EMBED_MODEL}")
        _model = SentenceTransformer(EMBED_MODEL)
    return _model

def embed(texts: list[str]) -> list[list[float]]:
    return get_model().encode(texts, convert_to_list=True)

def embed_query(text: str) -> list[float]:
    return get_model().encode([text], convert_to_list=True)[0]