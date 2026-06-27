import { Project, Experience, WritingPost } from '../types';

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
    description: 'WhatsApp-native voice bookkeeping for Pakistan\'s informal economy. Roman Urdu voice → AI extracts transactions → live ledger.',
    tags: ['OpenAI Whisper', 'GPT-4o', 'Supabase', 'FastAPI'],
    badge: 'WhatsApp API',
    github: 'https://github.com/tashfeen786',
  },
  {
    title: 'CryptoChat',
    icon: '📈',
    description: 'RAG system combining real-time Binance market data with LLM reasoning for personalized investment guidance.',
    tags: ['LangChain', 'LLaMA3', 'Binance API', 'PostgreSQL'],
    github: 'https://github.com/tashfeen786',
  },
  {
    title: 'HelmetEye (FYP)',
    icon: '🪖',
    description: 'Real-time helmet violation detection and number plate extraction using YOLOv12 + OCR for traffic surveillance.',
    tags: ['YOLOv12', 'OpenCV', 'OCR', 'React'],
    badge: 'FYP',
    github: 'https://github.com/tashfeen786',
  },
];

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
      'YOLO-based object detection for real-world industry applications',
      'Model integration and deployment workflows',
    ],
  },
];

export const writingPosts: WritingPost[] = [
  {
    title: 'Add your 13k impression post title here',
    impressions: '13.2k',
    url: 'https://www.linkedin.com/in/tashfeen-aziz/',
  },
];