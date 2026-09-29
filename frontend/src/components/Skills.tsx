import { skillGroups } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Skills() {
  const headerRef = useReveal()

  return (
    <section id="skills" className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal mb-16">
          <span className="font-mono text-accent text-xs tracking-wider uppercase mb-3 block">
            Skills
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl tracking-tight text-text-primary">
            Technical Stack
          </h2>
          <div className="w-12 h-px bg-accent mt-4" />
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.label} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, index }: { group: typeof import('../data').skillGroups[0]; index: number }) {
  const cardRef = useReveal(0.1)

  const prioritySkills = [
    'Python', 'Generative AI', 'LLMs', 'RAG', 'LangGraph',
    'LangChain', 'AI Agents', 'FastAPI', 'Machine Learning', 'Deep Learning'
  ]

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="reveal bg-bg border border-border rounded-xl p-6 hover:border-border-hover transition-all duration-300 group"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-lg" role="img" aria-label={group.label}>{group.icon}</span>
        <h3 className="font-grotesk font-semibold text-sm text-accent uppercase tracking-wider">
          {group.label}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map(skill => {
          const isPriority = prioritySkills.includes(skill)
          return (
            <span
              key={skill}
              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors duration-200 ${
                isPriority
                  ? 'text-text-primary bg-accent/10 border-accent/40 font-medium'
                  : 'text-text-secondary bg-surface-2 border-border hover:text-text-primary hover:border-border-hover'
              }`}
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                ...(isPriority ? { borderColor: 'rgba(124,92,252,0.4)', backgroundColor: 'rgba(124,92,252,0.1)' } : {})
              }}
            >
              {skill}
            </span>
          )
        })}
      </div>
    </div>
  )
}