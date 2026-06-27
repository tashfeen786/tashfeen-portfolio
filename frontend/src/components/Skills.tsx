const skillGroups = [
  { label: 'Agentic AI', skills: ['LangGraph', 'LangChain', 'RAG Systems', 'Tool-Calling', 'Prompt Engineering'] },
  { label: 'LLMs & Models', skills: ['Gemini 2.5', 'GPT-4o', 'LLaMA3', 'Groq', 'Whisper', 'HuggingFace'] },
  { label: 'Vector DBs', skills: ['ChromaDB', 'Qdrant', 'Pinecone', 'BM25 + RRF', 'RAGAS'] },
  { label: 'Backend', skills: ['Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker', 'Git'] },
  { label: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
  { label: 'CV & ML', skills: ['YOLOv12', 'OpenCV', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'MLflow'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-14">
          <h2 className="font-grotesk font-bold text-4xl tracking-tight">Tech Stack</h2>
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-amber to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div key={group.label} className="bg-surface border border-border rounded-xl p-6">
              <h4 className="font-grotesk font-semibold text-xs tracking-widest text-amber uppercase mb-4">
                {group.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="bg-bg border border-border text-muted px-3 py-1.5 rounded-md font-mono text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}