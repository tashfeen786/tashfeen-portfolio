import { useState, useEffect } from 'react'

const links = ['About', 'Projects', 'Experience', 'Skills', 'Writing', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <span className="font-grotesk font-bold text-lg text-amber tracking-tight">
          tashfeen.dev
        </span>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-muted hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => document.getElementById('chat-widget')?.scrollIntoView()}
          className="bg-amber text-bg font-grotesk font-bold text-sm px-4 py-2 rounded-lg hover:bg-amber-lt transition-colors duration-200"
        >
          Ask AI 🤖
        </button>

      </div>
    </nav>
  )
}