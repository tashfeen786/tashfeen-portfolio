import { useReveal } from '../hooks/useReveal'

const whatIBuild = [
  { icon: '🤖', label: 'AI Agents' },
  { icon: '📚', label: 'RAG Systems' },
  { icon: '✨', label: 'LLM Applications' },
  { icon: '🔄', label: 'AI Automation' },
  { icon: '⚡', label: 'Python APIs' },
  { icon: '👁️', label: 'Computer Vision' },
]

export default function About() {
  const sectionRef = useReveal()
  const cardsRef = useReveal(0.1)

  return (
    <section id="about" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="reveal mb-16">
          <span className="font-mono text-accent text-xs tracking-wider uppercase mb-3 block">
            About
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl tracking-tight text-text-primary">
            Who I Am
          </h2>
          <div className="w-12 h-px bg-accent mt-4" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">

          {/* Text */}
          <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="reveal md:col-span-3">
            <p className="text-text-secondary leading-[1.8] text-[15px] mb-6">
              I'm an <span className="text-text-primary font-medium">AI/ML Engineer</span> focused on building practical
              AI applications using Generative AI, LLMs, RAG systems, AI agents, and Python backend technologies.
            </p>
            <p className="text-text-secondary leading-[1.8] text-[15px] mb-6">
              As a <span className="text-text-primary font-medium">BS Information Technology</span> graduate, I've gained
              hands-on AI/ML experience through internships at <span className="text-text-primary font-medium">NETSOL Technologies</span> and{' '}
              <span className="text-text-primary font-medium">Stameta.ai</span>, working on everything from multi-agent
              AI assistants to computer vision systems.
            </p>
            <p className="text-text-secondary leading-[1.8] text-[15px]">
              My focus is on designing and building real-world AI applications that solve genuine problems —
              from enterprise AI chatbots with RAG to voice-powered bookkeeping systems for small businesses.
            </p>
          </div>

          {/* What I Build */}
          <div ref={cardsRef as React.RefObject<HTMLDivElement>} className="reveal md:col-span-2">
            <h3 className="font-grotesk font-semibold text-sm text-muted uppercase tracking-wider mb-5">
              What I Build
            </h3>
            <div className="grid grid-cols-2 gap-3 reveal-children">
              {whatIBuild.map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border hover:border-border-hover transition-colors duration-200"
                >
                  <span className="text-lg" role="img" aria-label={item.label}>{item.icon}</span>
                  <span className="text-text-primary text-[13px] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
