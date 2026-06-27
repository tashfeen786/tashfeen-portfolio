import { experiences } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-14">
          <h2 className="font-grotesk font-bold text-4xl tracking-tight">Experience</h2>
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-amber to-transparent" />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

          <div className="flex flex-col gap-12 pl-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[33px] top-1.5 w-3 h-3 rounded-full bg-amber border-2 border-bg shadow-[0_0_8px_rgba(245,158,11,0.6)]" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-4">
                  <div>
                    <h3 className="font-grotesk font-semibold text-lg tracking-tight">{exp.role}</h3>
                    <p className="text-amber text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted bg-bg border border-border px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-muted text-sm leading-relaxed flex gap-3">
                      <span className="text-amber mt-1.5 text-xs flex-shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}