import { useState, useEffect } from 'react'

const links = ['About', 'Projects', 'Experience', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Active section detection
      const sections = links.map(l => l.toLowerCase())
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
      (scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent')}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <span className="font-grotesk font-bold text-lg tracking-tight" style={{ color: '#10B981' }}>
          tashfeen.dev
        </span>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => {
            const id = link.toLowerCase()
            const isActive = activeSection === id
            return (
              <button key={link} onClick={() => scrollTo(id)}
                className="text-sm font-medium transition-all duration-200 relative"
                style={{ color: isActive ? '#F0FDF4' : '#444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
                {link}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: '#10B981' }} />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <a href="/resume.pdf" download="Tashfeen_Aziz_Resume.pdf"
            className="font-grotesk font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.06)' }}>
            ↓ Resume
          </a>
          <button onClick={() => scrollTo('contact')}
            className="font-grotesk font-bold text-sm px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ background: '#10B981', color: '#080808', border: 'none', cursor: 'pointer' }}>
            Hire Me
          </button>
        </div>

      </div>
    </nav>
  )
}