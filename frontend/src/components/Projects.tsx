import { Code2, ExternalLink } from 'lucide-react'
import { projects } from '../data'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-14">
          <h2 className="font-grotesk font-bold text-4xl tracking-tight">Projects</h2>
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-amber to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => {
            return (
              <div
                key={project.title}
                className="bg-surface border border-border rounded-2xl p-7 hover:border-amber/40 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-amber/10 rounded-xl flex items-center justify-center text-xl">
                    {project.icon}
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-white transition-colors"
                      >
                        <Code2 size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-grotesk font-semibold text-lg tracking-tight mb-2">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-purple/10 border border-purple/30 text-violet-400 px-2.5 py-1 rounded-md font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.badge && (
                    <span className="bg-amber/10 border border-amber/30 text-amber px-2.5 py-1 rounded-md font-mono text-[11px]">
                      {project.badge}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}