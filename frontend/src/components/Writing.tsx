import { ExternalLink } from 'lucide-react'
import { writingPosts } from '../data'

export default function Writing() {
  return (
    <section id="writing" className="py-24 px-6 md:px-16 bg-surface">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-14">
          <h2 className="font-grotesk font-bold text-4xl tracking-tight">Writing</h2>
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-amber to-transparent" />
        </div>

        <div className="flex flex-col gap-4">
          {writingPosts.map((post, i) => (
            
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-bg border border-border rounded-xl px-6 py-5 hover:border-amber/40 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">📝</span>
                <span className="font-grotesk font-medium text-sm">{post.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-amber bg-amber/10 border border-amber/20 px-3 py-1 rounded-full">
                  {post.impressions} impressions
                </span>
                <ExternalLink size={14} className="text-muted group-hover:text-white transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <p className="text-muted text-sm mt-6">
          More on{' '}
          <a href="https://www.linkedin.com/in/tashfeen-aziz/" target="_blank" rel="noopener noreferrer"
            className="text-amber hover:underline">
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  )
}