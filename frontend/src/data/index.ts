import type { Project, Experience, WritingPost } from '../types'

export const projects: Project[] = [
  {
    title: 'NetsolChatbot',
    icon: '🤖',
    description: 'Multi-node LangGraph agent with RAG, Text-to-SQL charts, Google Calendar, and FastAPI streaming. Built at NetsolTech internship.',
    tags: ['LangGraph', 'Gemini 2.5', 'ChromaDB', 'FastAPI'],
    badge: 'Production',
    github: 'https://github.com/tashfeen786',
  },
  {
    title: 'AI Voice Khata',
    icon: '🎙️',
    description: "WhatsApp-native voice bookkeeping for Pakistan's informal economy. Roman Urdu voice to AI extracts transactions to live ledger.",
    tags: ['OpenAI Whisper', 'GPT-4o', 'Supabase', 'FastAPI'],
    badge: 'WhatsApp API',
    github: 'https://github.com/tashfeen786/AI_voice_khata',
  },
  {
    title: 'NLP & RAG Curriculum',
    icon: '🧠',
    description: '14-module hands-on curriculum covering full RAG pipeline, LangChain, LangGraph, and RAGAS evaluation from fundamentals to production.',
    tags: ['LangChain', 'LangGraph', 'RAGAS', 'Python'],
    github: 'https://github.com/tashfeen786/NLP',
  },
  {
    title: 'CryptoChat',
    icon: '📈',
    description: 'RAG system combining real-time Binance market data with LLM reasoning for personalized investment guidance.',
    tags: ['LangChain', 'LLaMA3', 'Binance API', 'PostgreSQL'],
    github: 'https://github.com/tashfeen786/Crypto_ChatBOt_system',
  },
  {
    title: 'HelmetEye (FYP)',
    icon: '🪖',
    description: 'Real-time helmet violation detection and number plate extraction using YOLOv12 + OCR for traffic surveillance.',
    tags: ['YOLOv12', 'OpenCV', 'OCR', 'React'],
    badge: 'FYP',
    github: 'https://github.com/tashfeen786/HelmetEye',
  },
  {
    title: 'STEMETA ML Projects',
    icon: '🔬',
    description: '9 real-world ML projects: fraud detection, churn prediction, NLP spam classifier, healthcare and FinTech models.',
    tags: ['Scikit-learn', 'Flask', 'NLP', 'Pandas'],
    github: 'https://github.com/tashfeen786/STEMETA_Intership_Projects',
  },
]

export const experiences: Experience[] = [
  {
    role: 'AI/ML Engineer Intern',
    company: 'NetsolTech, Lahore',
    period: 'June 2026 – July 2026',
    points: [
      'Built NetsolChatbot: multi-node LangGraph agent with RAG, Text-to-SQL, Google Calendar, Tavily search',
      'Engineered FastAPI streaming backend; resolved production-blocking gRPC + PyTorch DLL crash on Windows',
      'Implemented ChromaDB vector store, SQL injection protection, file upload validation',
    ],
  },
  {
    role: 'AI/ML Trainee',
    company: 'NetsolTech, Lahore',
    period: 'July 2025 – December 2025',
    points: [
      '6-month structured AI/ML program: computer vision, deep learning, production ML workflows',
      'Trained and evaluated ML/DL models using Python, TensorFlow, PyTorch on real-world datasets',
      'MLflow for experiment tracking and model versioning',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'Stameta.ai, Islamabad',
    period: 'June 2025 – July 2025',
    points: [
      'Completed 9 real-world ML projects including fraud detection, churn prediction, NLP spam classification',
      'YOLO-based object detection for real-world industry applications',
    ],
  },
]

export const writingPosts: WritingPost[] = [
  {
    title: 'Add your 13k impression post title here',
    impressions: '13.2k',
    url: 'https://www.linkedin.com/in/tashfeen-aziz/',
  },
]