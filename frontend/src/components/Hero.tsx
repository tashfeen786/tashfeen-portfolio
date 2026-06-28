import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number; vx: number; vy: number
  r: number; label: string; color: string
  glow: number; glowDir: number; glowSpeed: number
}
interface Pulse { from: number; to: number; t: number }

const NODE_LABELS = ['RAG','Tool\nCall','Memory','LLM','Output','Embed','Input','Search']
const NODE_COLORS = ['#10B981','#6366F1','#2D3748','#10B981','#34D399','#6366F1','#10B981','#2D3748']
const EDGES = [[0,2],[0,4],[1,2],[1,4],[2,4],[3,4],[4,5],[6,0],[6,1],[7,2]]
const ACCENT = '#10B981'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number, W = 0, H = 0
    let nodes: Node[] = [], pulses: Pulse[] = [], running = false

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function initNodes() {
      nodes = NODE_LABELS.map((label, i) => ({
        x: rand(W * 0.55, W * 0.95), y: rand(H * 0.05, H * 0.95),
        vx: rand(-0.13, 0.13), vy: rand(-0.13, 0.13),
        r: rand(16, 22), label, color: NODE_COLORS[i],
        glow: Math.random(), glowDir: Math.random() > 0.5 ? 1 : -1,
        glowSpeed: rand(0.006, 0.012),
      }))
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = canvas.width = rect.width || window.innerWidth
      H = canvas.height = rect.height || window.innerHeight
      initNodes()
    }

    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      EDGES.forEach(([i, j]) => {
        if (!nodes[i] || !nodes[j]) return
        const a = nodes[i], b = nodes[j]
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = ACCENT + '11'; ctx.lineWidth = 1; ctx.stroke()
        const ang = Math.atan2(b.y - a.y, b.x - a.x)
        const mx = a.x + (b.x - a.x) * 0.58, my = a.y + (b.y - a.y) * 0.58
        ctx.beginPath()
        ctx.moveTo(mx, my)
        ctx.lineTo(mx - 6 * Math.cos(ang - 0.38), my - 6 * Math.sin(ang - 0.38))
        ctx.lineTo(mx - 6 * Math.cos(ang + 0.38), my - 6 * Math.sin(ang + 0.38))
        ctx.closePath(); ctx.fillStyle = ACCENT + '18'; ctx.fill()
      })
      pulses = pulses.filter(p => p.t <= 1)
      pulses.forEach(p => {
        p.t += 0.011
        if (!nodes[p.from] || !nodes[p.to]) return
        const a = nodes[p.from], b = nodes[p.to]
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t
        const g = ctx.createRadialGradient(px, py, 0, px, py, 11)
        g.addColorStop(0, ACCENT + 'CC'); g.addColorStop(0.5, ACCENT + '22'); g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(px, py, 11, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill()
      })
      nodes.forEach(n => {
        n.glow += n.glowSpeed * n.glowDir
        if (n.glow > 1 || n.glow < 0.1) n.glowDir *= -1
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.2)
        g.addColorStop(0, n.color + '20'); g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = '#080808'; ctx.fill()
        ctx.strokeStyle = n.color; ctx.lineWidth = 1.3; ctx.stroke()
        ctx.fillStyle = n.color
        ctx.font = '600 7.5px JetBrains Mono, monospace'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        n.label.split('\n').forEach((line, li, arr) => {
          ctx.fillText(line, n.x, n.y + (li - (arr.length - 1) / 2) * 11)
        })
        n.x += n.vx; n.y += n.vy
        if (n.x < W * 0.53 || n.x > W - 15) n.vx *= -1
        if (n.y < 15 || n.y > H - 15) n.vy *= -1
        if (Math.random() > 0.025) return
        const e = EDGES[Math.floor(Math.random() * EDGES.length)]
        if (nodes[e[0]] && nodes[e[1]]) pulses.push({ from: e[0], to: e[1], t: 0 })
      })
      animId = requestAnimationFrame(draw)
    }

    const timer = setTimeout(() => { running = true; resize(); draw() }, 100)
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    window.addEventListener('resize', resize)
    return () => { running = false; clearTimeout(timer); cancelAnimationFrame(animId); ro.disconnect(); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div style={{ height: '14px' }} />

      <section
        id="about"
        className="relative overflow-hidden"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }} />

        {/* Grid */}
        <div
          className="relative z-10 grid items-center"
          style={{
            gridTemplateColumns: '1fr 1fr',
            minHeight: 'calc(100vh - 64px)',
            padding: '48px 56px 48px 56px',
            gap: '40px',
          }}
        >
          {/* LEFT: Text — vertically centered */}
          <div className="flex flex-col justify-center">

            <h1
              className="font-grotesk font-extrabold tracking-[-3px]"
              style={{ fontSize: '70px', lineHeight: '0.93', color: '#F0FDF4', marginBottom: '20px' }}
            >
              Tashfeen
              <span className="block" style={{ color: '#10B981' }}>Aziz</span>
            </h1>

            <p className="font-grotesk font-semibold" style={{ fontSize: '16px', color: '#555', marginBottom: '6px' }}>
              AI Engineer · LangGraph & RAG Systems
            </p>

            <p className="font-mono" style={{ fontSize: '11.5px', color: 'rgba(16,185,129,0.4)', marginBottom: '28px' }}>
              // Kotli se Lahore tak — agents bana raha hoon
            </p>

            <p style={{ fontSize: '14px', color: '#2E2E2E', lineHeight: '1.75', maxWidth: '400px', marginBottom: '28px' }}>
              Building{' '}
              <span style={{ color: '#555', fontWeight: 500 }}>production-grade agentic AI systems</span>
              {' '}— LangGraph agents, RAG pipelines, and voice-native apps for Pakistan's informal economy.
            </p>

            <div className="flex flex-wrap gap-2" style={{ marginBottom: '28px' }}>
              {['LangGraph', 'RAG Pipeline', 'Tool-Calling', 'FastAPI', 'Groq LLaMA3'].map(s => (
                <span key={s} className="px-3 py-1 rounded-md font-mono flex items-center gap-1"
                  style={{ fontSize: '10.5px', background: 'rgba(99,102,241,0.09)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8' }}>
                  <span style={{ color: '#10B981', fontSize: '8px' }}>◈</span>{s}
                </span>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap" style={{ marginBottom: '24px' }}>
              <button
                onClick={() => document.getElementById('chat-widget')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-grotesk font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: '#10B981', color: '#080808', fontSize: '14px', padding: '12px 28px' }}>
                🤖 Ask my AI
              </button>
              <a href="#projects"
                className="font-grotesk font-semibold rounded-xl"
                style={{ color: '#F0FDF4', border: '1px solid #222', fontSize: '14px', padding: '12px 28px' }}>
                View Projects
              </a>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full w-fit"
              style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', color: '#10B981', padding: '6px 14px' }}>
              <span className="rounded-full animate-pulse"
                style={{ width: '6px', height: '6px', background: '#10B981', boxShadow: '0 0 6px #10B981', display: 'inline-block', flexShrink: 0 }} />
              <span className="font-mono" style={{ fontSize: '10px' }}>Open to opportunities · Lahore, Pakistan</span>
            </div>
          </div>

          {/* RIGHT: Photo — vertically centered, properly padded */}
          <div className="flex items-center justify-center" style={{ height: '100%' }}>

            <div className="relative" style={{ width: '580px', height: '640px' }}>

              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: '16px',
                background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />

              {/* Photo */}
              <img
                src="/photo.png"
                alt="Tashfeen Aziz"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  display: 'block',
                  position: 'relative', zIndex: 1,
                }}
              />

              {/* Edge fades */}
              <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70px', zIndex: 2, background: 'linear-gradient(180deg, #080808 0%, transparent 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '60px', zIndex: 2, background: 'linear-gradient(0deg, #080808 0%, transparent 100%)' }} />
              <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: '48px', zIndex: 2, background: 'linear-gradient(90deg, #080808 0%, transparent 100%)' }} />
              <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: '48px', zIndex: 2, background: 'linear-gradient(270deg, #080808 0%, transparent 100%)' }} />

              {/* Stat: 3+ */}
              <div className="absolute rounded-xl" style={{ zIndex: 3, left: '-24px', top: '38%', background: 'rgba(8,8,8,0.93)', border: '1px solid rgba(16,185,129,0.22)', backdropFilter: 'blur(8px)', padding: '12px 16px' }}>
                <div className="font-grotesk font-bold leading-none" style={{ fontSize: '22px', color: '#10B981' }}>3+</div>
                <div className="font-mono" style={{ fontSize: '10px', color: '#444', marginTop: '4px' }}>Production AI<br />Systems</div>
              </div>

              {/* Stat: 13k */}
              <div className="absolute rounded-xl" style={{ zIndex: 3, right: '-24px', top: '22%', background: 'rgba(8,8,8,0.93)', border: '1px solid rgba(16,185,129,0.22)', backdropFilter: 'blur(8px)', padding: '12px 16px' }}>
                <div className="font-grotesk font-bold leading-none" style={{ fontSize: '22px', color: '#10B981' }}>13k</div>
                <div className="font-mono" style={{ fontSize: '10px', color: '#444', marginTop: '4px' }}>LinkedIn<br />Impressions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute flex items-center gap-2 font-mono" style={{ bottom: '24px', left: '56px', zIndex: 10, fontSize: '10px', color: '#222' }}>
          <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #10B981, transparent)' }} />
          scroll to explore
        </div>

      </section>
    </>
  )
}