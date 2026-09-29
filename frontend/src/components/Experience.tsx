import { experiences } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const headerRef = useReveal()

  return (
    <section id="experience" className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal mb-16">
          <span className="font-mono text-accent text-xs tracking-wider uppercase mb-3 block">
            Experience
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl tracking-tight text-text-primary">
            Professional Journey
          </h2>
          <div className="w-12 h-px bg-accent mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, rgba(124,92,252,0.3) 0%, rgba(124,92,252,0.05) 100%)',
            }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ exp, index }: { exp: typeof import('../data').experiences[0]; index: number }) {
  const cardRef = useReveal(0.15)

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="reveal relative pl-12 md:pl-16"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-[10px] md:left-[18px] top-2 w-3 h-3 rounded-full"
        style={{
          background: '#7c5cfc',
          boxShadow: '0 0 12px rgba(124,92,252,0.4)',
          border: '2px solid #0a0a0f',
        }}
      />

      {/* Card */}
      <div className="bg-bg border border-border rounded-xl p-6 md:p-7 hover:border-border-hover transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="font-grotesk font-semibold text-lg text-text-primary tracking-tight">
              {exp.role}
            </h3>
            <p className="text-accent text-sm font-medium mt-0.5">
              {exp.company} — {exp.location}
            </p>
          </div>
          <span
            className="font-mono text-xs text-muted bg-surface-2 border border-border px-3 py-1.5 rounded-full whitespace-nowrap w-fit"
          >
            {exp.period}
          </span>
        </div>

        <ul className="flex flex-col gap-2.5">
          {exp.points.map((point, j) => (
            <li key={j} className="text-text-secondary text-sm leading-relaxed flex gap-3">
              <span className="text-accent mt-1 text-xs flex-shrink-0">▸</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}