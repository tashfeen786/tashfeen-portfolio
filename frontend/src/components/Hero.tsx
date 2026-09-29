import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = 0, H = 0
    let running = false
    let time = 0

    // Particles for a subtle technical/AI background
    interface Particle {
      x: number; y: number
      vx: number; vy: number
      size: number; opacity: number
    }

    let particles: Particle[] = []

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      initParticles()
    }

    function initParticles() {
      const count = Math.min(Math.floor((W * H) / 12000), 80)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      }))
    }

    function draw() {
      if (!running) return
      time += 0.005
      ctx.clearRect(0, 0, W, H)

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(124, 92, 252, 0.015)'
      ctx.lineWidth = 0.5
      const gridSize = 60
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 92, 252, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124, 92, 252, ${0.03 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Subtle radial glow
      const glow = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.3, W * 0.5)
      glow.addColorStop(0, 'rgba(124, 92, 252, 0.04)')
      glow.addColorStop(0.5, 'rgba(124, 92, 252, 0.01)')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }

    const timer = setTimeout(() => {
      running = true
      resize()
      draw()
    }, 50)

    window.addEventListener('resize', resize)
    return () => {
      running = false
      clearTimeout(timer)
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,92,252,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col justify-center"
        style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '48px' }}
      >
        <div className="max-w-2xl">

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit mb-8 animate-fade-in"
            style={{
              background: 'rgba(124,92,252,0.06)',
              border: '1px solid rgba(124,92,252,0.2)',
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full animate-pulse-slow"
              style={{
                background: '#7c5cfc',
                boxShadow: '0 0 8px rgba(124,92,252,0.6)',
                display: 'inline-block',
              }}
            />
            <span className="font-mono text-accent text-[11px]">
              Open to Opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-grotesk font-bold tracking-[-2px] animate-slide-up"
            style={{
              fontSize: 'clamp(40px, 6vw, 68px)',
              lineHeight: '1.05',
              color: '#f0f0f5',
              marginBottom: '16px',
            }}
          >
            Tashfeen Aziz
          </h1>

          {/* Title */}
          <p
            className="font-grotesk font-semibold text-accent mb-5 animate-slide-up"
            style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', animationDelay: '100ms', opacity: 0 }}
          >
            AI/ML Engineer
          </p>

          {/* Tagline */}
          <p
            className="text-text-secondary leading-relaxed mb-8 animate-slide-up"
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              maxWidth: '520px',
              animationDelay: '200ms',
              opacity: 0,
            }}
          >
            Building intelligent systems with Generative AI, LLMs, RAG & AI Agents.
            Focused on practical AI applications using Python backend technologies.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap items-center gap-3 mb-10 animate-slide-up"
            style={{ animationDelay: '300ms', opacity: 0 }}
          >
            <button
              onClick={() => scrollTo('projects')}
              className="font-grotesk font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: '#7c5cfc',
                color: '#fff',
                fontSize: '14px',
                padding: '12px 28px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(124,92,252,0.25)',
              }}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="font-grotesk font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: '#f0f0f5',
                border: '1px solid #2a2a3e',
                fontSize: '14px',
                padding: '12px 28px',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
              }}
            >
              Let's Connect
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-grotesk font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
              style={{
                color: '#f0f0f5',
                border: '1px solid #2a2a3e',
                fontSize: '14px',
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.02)',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Resume
            </a>
          </div>

          {/* Social links */}
          <div
            className="flex items-center gap-5 animate-slide-up"
            style={{ animationDelay: '400ms', opacity: 0 }}
          >
            <a
              href="https://github.com/tashfeen786"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tashfeen-aziz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:tashfeen247@gmail.com"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
      >
        <div
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1"
        >
          <div
            className="w-1 h-2 rounded-full bg-accent animate-bounce"
            style={{ animationDuration: '1.5s' }}
          />
        </div>
      </div>
    </section>
  )
}