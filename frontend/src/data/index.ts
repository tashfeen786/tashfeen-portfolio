import type { Project, Experience, SkillGroup, Capability } from '../types'

export const projects: Project[] = [
  {
    title: 'NetsolChatbot',
    icon: '🤖',
    description: 'Multi-agent AI assistant for enterprise teams combining RAG, analytics, and tool calling.',
    problem: 'Enterprise teams needed a unified AI assistant that could handle document Q&A, database analytics, calendar management, and web search — all in one interface.',
    solution: 'Built a multi-agent system using LangGraph with specialized nodes for each task, connected via FastAPI with real-time streaming.',
    implementation: 'Architected with LangGraph for agent orchestration, FastAPI for streaming endpoints, ChromaDB for vector retrieval, and Google Gemini as the core reasoning engine. Integrated external APIs (Google Calendar, Tavily) as agent tools.',
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
    description: 'Voice-powered bookkeeping bot for small businesses via WhatsApp.',
    problem: 'Small business owners in Pakistan\'s informal economy struggle with bookkeeping — they communicate in Urdu voice messages and lack digital record-keeping tools.',
    solution: 'Built an AI pipeline that converts Urdu/Roman Urdu voice messages on WhatsApp into structured financial records.',
    implementation: 'Engineered a data pipeline using OpenAI Whisper for Urdu voice transcription, GPT-4o for structured entity extraction (amount, entity, date, item), and Supabase for real-time ledger storage. Integrated with WhatsApp Business API.',
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
    description: 'AI cryptocurrency assistant combining real-time market data with LLM reasoning.',
    problem: 'Crypto investors need real-time market analysis combined with contextual understanding of their portfolio and risk tolerance.',
    solution: 'Developed an intelligent assistant that fetches live Binance data and provides personalized, data-backed crypto insights.',
    implementation: 'Built with LangChain for LLM orchestration and Groq API for ultra-low latency inference. Integrated the Binance API for live price/volume data and structured the context pipeline using RAG patterns.',
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
    description: 'Household energy management application with appliance tracking and AI recommendations.',
    problem: 'Pakistani households struggle to understand and reduce their electricity bills due to complex NEPRA slab structures and lack of energy awareness tools.',
    solution: 'Created a comprehensive mobile app with AI-powered recommendations, OCR bill scanning, and real-time NEPRA slab calculations.',
    implementation: 'Developed the backend in FastAPI with Claude API for generating personalized energy-saving insights. Integrated OCR for parsing physical bills and Firebase for real-time user data synchronization.',
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
    description: 'Real-time helmet violation detection and number plate extraction for traffic surveillance.',
    problem: 'Manual traffic surveillance is inefficient at reliably identifying motorcyclists riding without helmets and capturing their license plates.',
    solution: 'Built a real-time computer vision pipeline that automatically detects helmetless riders and extracts their vehicle registration numbers.',
    implementation: 'Trained a custom YOLOv12 object detection model on traffic datasets. Integrated OpenCV for video stream processing and OCR for license plate text extraction. Served via a React/Python dashboard.',
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
    description: '9 real-world ML models including fraud detection, churn prediction, and NLP spam classifiers.',
    problem: 'Needed practical implementation of machine learning algorithms across diverse industry datasets to solve classification and regression problems.',
    solution: 'Developed 9 end-to-end ML projects covering healthcare, FinTech, and natural language processing domains.',
    implementation: 'Utilized Scikit-learn, Pandas, and NumPy for data preprocessing, feature engineering, and model training. Deployed predictive models via Flask REST APIs.',
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
      'Developed components for a multi-agent AI assistant using LangGraph, enabling autonomous document Q&A, Text-to-SQL analytics, and Tavily web search.',
      'Built REST APIs using FastAPI with Server-Sent Events (SSE) for real-time LLM token streaming.',
      'Implemented a RAG pipeline using ChromaDB for semantic retrieval of PDF and DOCX documents.',
      'Integrated Google Gemini as the core reasoning engine for complex decision-making and dynamic tool calling.',
      'Collaborated closely with senior engineering teams to integrate and deploy AI services.',
    ],
  },
  {
    role: 'AI/ML Trainee',
    company: 'NETSOL Technologies',
    location: 'Lahore',
    period: '2025',
    points: [
      'Trained and evaluated deep learning models using Python, TensorFlow, and PyTorch in a structured 6-month program.',
      'Developed data preprocessing pipelines for computer vision and NLP datasets.',
      'Assisted in optimizing model hyperparameters to improve classification accuracy and reduce inference latency.',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'Stameta.ai',
    location: 'Islamabad',
    period: '2025',
    points: [
      'Contributed to 9 Machine Learning projects covering financial fraud detection, customer churn prediction, and NLP classifiers.',
      'Built and evaluated predictive models using Scikit-learn, Pandas, and NumPy, and assisted in serving them via Flask REST endpoints.',
      'Trained YOLO-based object detection systems for computer vision industry applications.',
      'Developed text preprocessing pipelines for NLP spam detection and sentiment analysis.',
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