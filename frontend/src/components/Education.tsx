import { useReveal } from '../hooks/useReveal'

export default function Education() {
  const headerRef = useReveal()
  const cardRef = useReveal(0.15)

  return (
    <section className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal mb-16">
          <span className="font-mono text-accent text-xs tracking-wider uppercase mb-3 block">
            Education
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl tracking-tight text-text-primary">
            Academic Background
          </h2>
          <div className="w-12 h-px bg-accent mt-4" />
        </div>

        <div ref={cardRef as React.RefObject<HTMLDivElement>} className="reveal max-w-2xl">
          <div className="bg-bg border border-border rounded-xl p-7 hover:border-border-hover transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: 'rgba(124,92,252,0.06)',
                  border: '1px solid rgba(124,92,252,0.12)',
                }}
              >
                🎓
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-lg text-text-primary">
                  BS Information Technology
                </h3>
                <p className="text-accent text-sm font-medium mt-1">
                  University of Kotli
                </p>
                <span className="font-mono text-xs text-muted mt-2 inline-block">
                  Graduated 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
