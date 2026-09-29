import { capabilities } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Capabilities() {
  const headerRef = useReveal()

  return (
    <section className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal mb-16">
          <span className="font-mono text-accent text-xs tracking-wider uppercase mb-3 block">
            Capabilities
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl tracking-tight text-text-primary">
            What I Can Build
          </h2>
          <div className="w-12 h-px bg-accent mt-4" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({ cap, index }: { cap: typeof import('../data').capabilities[0]; index: number }) {
  const cardRef = useReveal(0.1)

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="reveal group bg-surface border border-border rounded-xl p-6 hover:border-accent-border transition-all duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: 'rgba(124,92,252,0.06)',
          border: '1px solid rgba(124,92,252,0.12)',
        }}
      >
        <span role="img" aria-label={cap.title}>{cap.icon}</span>
      </div>
      <h3 className="font-grotesk font-semibold text-base text-text-primary mb-2">
        {cap.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {cap.description}
      </p>
    </div>
  )
}
