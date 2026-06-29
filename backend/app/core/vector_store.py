import chromadb
from app.config import CHROMA_DIR, COLLECTION
from app.core.embeddings import embed, embed_query

_client     = None
_collection = None

def get_collection():
    global _client, _collection
    if _collection is None:
        _client     = chromadb.PersistentClient(path=CHROMA_DIR)
        _collection = _client.get_or_create_collection(
            name=COLLECTION,
            metadata={"hnsw:space": "cosine"},
        )
    return _collection

def build_store(chunks: list[dict]):
    """chunks = [{"id": str, "text": str}]"""
    col = get_collection()
    if col.count() > 0:
        print("Vector store already built — skipping.")
        return
    print(f"Building vector store with {len(chunks)} chunks...")
    texts = [c["text"] for c in chunks]
    ids   = [c["id"]   for c in chunks]
    vecs  = embed(texts)
    col.add(documents=texts, embeddings=vecs, ids=ids)
    print("Vector store ready.")

def retrieve(query: str, n: int = 4) -> list[str]:
    col = get_collection()
    vec = embed_query(query)
    res = col.query(query_embeddings=[vec], n_results=min(n, col.count()))
    return res["documents"][0] if res["documents"] else []