import { useReveal } from '../hooks/useReveal'

export default function About() {
  const sectionRef = useReveal()

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

        <div className="max-w-3xl">
          <div ref={sectionRef as React.RefObject<HTMLDivElement>} className="reveal">
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
        </div>
      </div>
    </section>
  )
}
