import { useState, useEffect } from 'react'

const links = ['Home', 'Projects', 'Experience', 'Skills', 'About', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // The exact order of sections on the page
      const sections = ['home', 'capabilities', 'projects', 'experience', 'skills', 'about', 'education', 'contact']
      
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // 150px accounts for the sticky navbar height + a small buffer
          if (rect.top <= 150) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initialize on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className={
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
          (scrolled
            ? 'bg-bg/85 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
            : 'bg-transparent')
        }
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-grotesk font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors duration-200"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            tashfeen<span className="text-accent">.ai</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const id = link.toLowerCase()
              const isActive = activeSection === id
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={
                    'text-[13px] font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ' +
                    (isActive
                      ? 'text-accent bg-accent-bg'
                      : 'text-muted hover:text-text-primary hover:bg-white/[0.03]')
                  }
                  style={{ background: isActive ? 'rgba(124,92,252,0.08)' : undefined, border: 'none', cursor: 'pointer' }}
                >
                  {link}
                </button>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Social icons - desktop */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/tashfeen786"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-text-primary hover:bg-white/[0.04] transition-all duration-200"
                aria-label="GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/tashfeen-aziz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-text-primary hover:bg-white/[0.04] transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Let's Connect button */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:inline-flex font-grotesk font-semibold text-[13px] px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-px"
              style={{
                background: 'rgba(124,92,252,0.12)',
                border: '1px solid rgba(124,92,252,0.3)',
                color: '#9b82ff',
                cursor: 'pointer',
              }}
            >
              Let's Connect
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span
                className="w-5 h-px bg-text-primary transition-all duration-300"
                style={{
                  transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                }}
              />
              <span
                className="w-5 h-px bg-text-primary transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="w-5 h-px bg-text-primary transition-all duration-300"
                style={{
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {links.map(link => {
            const id = link.toLowerCase()
            return (
              <button
                key={link}
                onClick={() => scrollTo(id)}
                className="font-grotesk font-semibold text-2xl text-text-primary hover:text-accent transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {link}
              </button>
            )
          })}
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/tashfeen786"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border text-muted hover:text-accent hover:border-accent-border transition-all"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/tashfeen-aziz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border text-muted hover:text-accent hover:border-accent-border transition-all"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  )
}