import type { Project, Experience, SkillGroup, Capability } from '../types'

export const projects: Project[] = [
  {
    title: 'NetsolChatbot',
    icon: '🤖',
    description: 'Multi-agent AI assistant using LangGraph with RAG, Text-to-SQL analytics, Google Calendar integration, and real-time streaming APIs.',
    problem: 'Enterprise teams needed a unified AI assistant that could handle document Q&A, database analytics, calendar management, and web search — all in one interface.',
    solution: 'Built a multi-agent system using LangGraph with specialized nodes for each task, connected via FastAPI with real-time streaming.',
    tags: ['LangGraph', 'FastAPI', 'Google Gemini', 'ChromaDB', 'RAG'],
    features: [
      'Multi-agent architecture with LangGraph',
      'Document RAG — PDF, DOCX, TXT ingestion',
      'ChromaDB vector search',
      'Text-to-SQL analytics',
      'Google Calendar integration',
      'Tavily web search',
      'REST APIs with real-time streaming',
    ],
    badge: 'Production',
    github: 'https://github.com/tashfeen786',
  },
  {
    title: 'AI Voice Khata',
    icon: '🎙️',
    description: 'AI-powered WhatsApp bookkeeping system that converts Urdu/Roman Urdu voice messages into structured financial records.',
    problem: 'Small business owners in Pakistan\'s informal economy struggle with bookkeeping — they communicate in Urdu voice messages and lack digital record-keeping tools.',
    solution: 'Built an AI pipeline that processes WhatsApp voice messages through Whisper for transcription and GPT-4o for extraction into structured ledger entries.',
    tags: ['OpenAI Whisper', 'GPT-4o', 'WhatsApp Business API', 'Supabase', 'OCR', 'Python'],
    features: [
      'Urdu/Roman Urdu voice-to-text transcription',
      'AI-powered transaction extraction',
      'Structured financial ledger',
      'WhatsApp Business API integration',
      'OCR for receipt scanning',
    ],
    badge: 'WhatsApp API',
    github: 'https://github.com/tashfeen786/AI_voice_khata',
  },
  {
    title: 'CryptoChat',
    icon: '📈',
    description: 'AI cryptocurrency assistant combining real-time Binance market data with LLM reasoning for personalized investment guidance.',
    problem: 'Crypto investors need real-time market analysis combined with contextual understanding of their portfolio and risk tolerance.',
    solution: 'Built a RAG system that fetches live Binance data and uses LLM reasoning to provide personalized crypto insights.',
    tags: ['Binance API', 'Groq API', 'LLMs', 'Python', 'LangChain'],
    features: [
      'Real-time Binance market data',
      'LLM-powered market analysis',
      'Personalized investment guidance',
      'RAG-based context retrieval',
    ],
    github: 'https://github.com/tashfeen786/Crypto_ChatBOt_system',
  },
  {
    title: 'EnergyMitr',
    icon: '⚡',
    description: 'Household energy management application for Pakistan with appliance tracking, bill prediction, and AI recommendations.',
    problem: 'Pakistani households struggle to understand and reduce their electricity bills due to complex NEPRA slab structures and lack of energy awareness tools.',
    solution: 'Built a comprehensive energy management app with AI-powered recommendations, OCR bill scanning, and real-time NEPRA slab calculations.',
    tags: ['React Native', 'FastAPI', 'Firebase', 'Claude API', 'OCR', 'AI/ML'],
    features: [
      'Appliance tracking & monitoring',
      'Electricity bill prediction',
      'NEPRA slab calculations',
      'AI-powered recommendations',
      'OCR bill scanning',
      'Peak-hour alerts',
      'Load-shedding awareness',
      'Neighborhood benchmarking',
      'Energy analytics dashboard',
    ],
    github: 'https://github.com/tashfeen786',
  },
  {
    title: 'HelmetEye (FYP)',
    icon: '🪖',
    description: 'Real-time helmet violation detection and number plate extraction using YOLOv12 and OCR for traffic surveillance.',
    tags: ['YOLOv12', 'OpenCV', 'OCR', 'React', 'Python'],
    features: [
      'Real-time helmet violation detection',
      'Number plate extraction with OCR',
      'Traffic surveillance dashboard',
    ],
    badge: 'FYP',
    github: 'https://github.com/tashfeen786/HelmetEye',
  },
  {
    title: 'STEMETA ML Projects',
    icon: '🔬',
    description: '9 real-world ML projects: fraud detection, churn prediction, NLP spam classifier, healthcare and FinTech models.',
    tags: ['Scikit-learn', 'Flask', 'NLP', 'Pandas', 'Python'],
    github: 'https://github.com/tashfeen786/STEMETA_Intership_Projects',
  },
]

export const experiences: Experience[] = [
  {
    role: 'AI/ML Engineer Intern',
    company: 'NETSOL Technologies',
    location: 'Lahore',
    period: '2026',
    points: [
      'Built multi-agent AI assistant using LangGraph with RAG, Text-to-SQL analytics, Google Calendar, and Tavily web search',
      'Engineered FastAPI backend with real-time streaming APIs',
      'Implemented ChromaDB vector store for document retrieval',
      'Integrated Google Gemini for LLM reasoning and generation',
      'Collaborated with senior engineers on production deployment',
    ],
  },
  {
    role: 'AI/ML Trainee',
    company: 'NETSOL Technologies',
    location: 'Lahore',
    period: '2025',
    points: [
      'Completed 6-month structured AI/ML training program',
      'Trained and evaluated ML/DL models using Python, TensorFlow, and PyTorch',
      'Worked on computer vision, deep learning, and production ML workflows',
      'Implemented data preprocessing, model training, evaluation, and optimization',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'Stameta.ai',
    location: 'Islamabad',
    period: '2025',
    points: [
      'Built YOLO-based object detection systems for real-world industry applications',
      'Completed 9 real-world ML projects including fraud detection and NLP classification',
      'Worked on computer vision model integration and deployment',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI / ML',
    icon: '🧠',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
  },
  {
    label: 'Generative AI',
    icon: '✨',
    skills: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'AI Agents', 'Prompt Engineering', 'Embeddings', 'Vector Databases'],
  },
  {
    label: 'Backend',
    icon: '⚙️',
    skills: ['Python', 'FastAPI', 'REST APIs', 'API Integration'],
  },
  {
    label: 'Tools / Databases',
    icon: '🗄️',
    skills: ['ChromaDB', 'Firebase', 'Supabase', 'Git', 'GitHub', 'Docker'],
  },
  {
    label: 'AI APIs',
    icon: '🔗',
    skills: ['Google Gemini', 'OpenAI', 'Groq', 'Tavily', 'Binance API', 'Google Calendar API', 'WhatsApp Business API'],
  },
]

export const capabilities: Capability[] = [
  {
    title: 'AI Agents',
    description: 'Multi-agent systems with LangGraph, tool-calling, and autonomous reasoning.',
    icon: '🤖',
  },
  {
    title: 'RAG Systems',
    description: 'Document retrieval pipelines with vector databases, embeddings, and hybrid search.',
    icon: '📚',
  },
  {
    title: 'Generative AI Apps',
    description: 'LLM-powered applications using GPT-4, Gemini, and open-source models.',
    icon: '✨',
  },
  {
    title: 'Python AI Backends',
    description: 'Production-grade APIs with FastAPI, streaming, and robust error handling.',
    icon: '⚡',
  },
  {
    title: 'Computer Vision',
    description: 'Object detection and image processing with YOLO, OpenCV, and deep learning.',
    icon: '👁️',
  },
  {
    title: 'AI Automation',
    description: 'Automated workflows integrating AI with business tools and external APIs.',
    icon: '🔄',
  },
]