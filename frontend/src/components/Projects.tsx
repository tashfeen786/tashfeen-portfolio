import { useState } from 'react'
import { projects } from '../data'
import { useReveal } from '../hooks/useReveal'
import type { Project } from '../types'

export default function Projects() {
  const headerRef = useReveal()

  return (
    <section id="projects" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal mb-16">
          <span className="font-mono text-accent text-xs tracking-wider uppercase mb-3 block">
            Projects
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl tracking-tight text-text-primary">
            Featured Work
          </h2>
          <div className="w-12 h-px bg-accent mt-4" />
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useReveal(0.1)

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="reveal group bg-surface border border-border rounded-xl overflow-hidden hover:border-border-hover transition-all duration-300"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Card header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)' }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-grotesk font-semibold text-base text-text-primary tracking-tight">
                {project.title}
              </h3>
              {project.badge && (
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded mt-0.5 inline-block"
                  style={{
                    background: 'rgba(124,92,252,0.1)',
                    border: '1px solid rgba(124,92,252,0.25)',
                    color: '#9b82ff',
                  }}
                >
                  {project.badge}
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-accent hover:bg-accent-bg transition-all duration-200"
                aria-label={`${project.title} GitHub`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-accent hover:bg-accent-bg transition-all duration-200"
                aria-label={`${project.title} Live Demo`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4">
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Expandable details */}
        {(project.problem || project.features) && (
          <>
            {expanded && (
              <div className="space-y-4 mb-4 animate-fade-in">
                {project.problem && (
                  <div>
                    <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-1.5">Problem</h4>
                    <p className="text-text-secondary text-[13px] leading-relaxed">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-1.5">Solution</h4>
                    <p className="text-text-secondary text-[13px] leading-relaxed">{project.solution}</p>
                  </div>
                )}
                {project.features && (
                  <div>
                    <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-2">Key Features</h4>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {project.features.map(f => (
                        <li key={f} className="text-text-secondary text-[13px] flex items-start gap-2">
                          <span className="text-accent text-[10px] mt-1">◈</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-accent text-xs font-mono hover:underline mb-4 block"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {expanded ? '− Show less' : '+ Show details'}
            </button>
          </>
        )}
      </div>

      {/* Tags */}
      <div className="px-6 pb-6 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md font-mono text-[11px]"
              style={{
                background: 'rgba(124,92,252,0.06)',
                border: '1px solid rgba(124,92,252,0.15)',
                color: '#9b82ff',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}