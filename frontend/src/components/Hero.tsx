import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number
  vx: number; vy: number
  r: number; label: string; color: string
  glow: number; glowDir: number; glowSpeed: number
}
interface Pulse { from: number; to: number; t: number }

const NODE_LABELS = ['RAG', 'Tool\nCall', 'Memory', 'LLM', 'Output', 'Embed', 'Input', 'Search']
const NODE_COLORS = ['#10B981','#6366F1','#374151','#10B981','#34D399','#6366F1','#10B981','#374151']
const EDGES = [[0,2],[0,4],[1,2],[1,4],[2,4],[3,4],[4,5],[6,0],[6,1],[7,2]]
const ACCENT = '#10B981'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = 0, H = 0
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let running = false

    function rand(a: number, b: number) { return a + Math.random() * (b - a) }

    function initNodes() {
      nodes = NODE_LABELS.map((label, i) => ({
        x: rand(W * 0.05, W * 0.95),
        y: rand(H * 0.05, H * 0.95),
        vx: rand(-0.16, 0.16), vy: rand(-0.16, 0.16),
        r: rand(18, 26), label,
        color: NODE_COLORS[i],
        glow: Math.random(),
        glowDir: Math.random() > 0.5 ? 1 : -1,
        glowSpeed: rand(0.007, 0.014),
      }))
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = canvas.width = rect.width || window.innerWidth
      H = canvas.height = rect.height || window.innerHeight
      initNodes()
    }

    function spawnPulse() {
      if (Math.random() > 0.03) return
      const e = EDGES[Math.floor(Math.random() * EDGES.length)]
      if (nodes[e[0]] && nodes[e[1]]) pulses.push({ from: e[0], to: e[1], t: 0 })
    }

    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)

      EDGES.forEach(([i, j]) => {
        if (!nodes[i] || !nodes[j]) return
        const a = nodes[i], b = nodes[j]
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = ACCENT + '14'; ctx.lineWidth = 1; ctx.stroke()
        const ang = Math.atan2(b.y - a.y, b.x - a.x)
        const mx = a.x + (b.x - a.x) * 0.58, my = a.y + (b.y - a.y) * 0.58
        ctx.beginPath()
        ctx.moveTo(mx, my)
        ctx.lineTo(mx - 7 * Math.cos(ang - 0.38), my - 7 * Math.sin(ang - 0.38))
        ctx.lineTo(mx - 7 * Math.cos(ang + 0.38), my - 7 * Math.sin(ang + 0.38))
        ctx.closePath(); ctx.fillStyle = ACCENT + '22'; ctx.fill()
      })

      pulses = pulses.filter(p => p.t <= 1)
      pulses.forEach(p => {
        p.t += 0.012
        if (!nodes[p.from] || !nodes[p.to]) return
        const a = nodes[p.from], b = nodes[p.to]
        const px = a.x + (b.x - a.x) * p.t, py = a.y + (b.y - a.y) * p.t
        const g = ctx.createRadialGradient(px, py, 0, px, py, 13)
        g.addColorStop(0, ACCENT + 'EE'); g.addColorStop(0.5, ACCENT + '30'); g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(px, py, 13, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill()
      })

      nodes.forEach(n => {
        n.glow += n.glowSpeed * n.glowDir
        if (n.glow > 1 || n.glow < 0.1) n.glowDir *= -1
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.6)
        g.addColorStop(0, n.color + '28'); g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.6, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = '#080808'; ctx.fill()
        ctx.strokeStyle = n.color; ctx.lineWidth = 1.4; ctx.stroke()
        ctx.fillStyle = n.color
        ctx.font = '600 8.5px JetBrains Mono, monospace'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        n.label.split('\n').forEach((line, li, arr) => {
          ctx.fillText(line, n.x, n.y + (li - (arr.length - 1) / 2) * 11)
        })
        n.x += n.vx; n.y += n.vy
        if (n.x < 20 || n.x > W - 20) n.vx *= -1
        if (n.y < 20 || n.y > H - 20) n.vy *= -1
      })

      spawnPulse()
      animId = requestAnimationFrame(draw)
    }

    // Delay so DOM has rendered and canvas has real dimensions
    const timer = setTimeout(() => {
      running = true
      resize()
      draw()
    }, 100)

    const ro = new ResizeObserver(() => { resize() })
    ro.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      running = false
      clearTimeout(timer)
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="about" className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* Canvas — full section background, visible mainly on right */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* LEFT: Text */}
      <div className="relative z-10 flex flex-col justify-center px-10 md:px-14 py-24 md:py-0"
        style={{ background: 'linear-gradient(90deg, rgba(8,8,8,0.99) 0%, rgba(8,8,8,0.96) 65%, rgba(8,8,8,0.7) 85%, transparent 100%)' }}>

        <div className="inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-[11px] font-mono mb-6 w-fit"
          style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.22)', color: '#10B981' }}>
          <span className="w-[7px] h-[7px] rounded-full animate-pulse"
            style={{ background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
          Open to opportunities · Lahore, Pakistan
        </div>

        <h1 className="font-grotesk font-extrabold leading-[0.95] tracking-[-3px] mb-3"
          style={{ fontSize: '64px', color: '#F0FDF4' }}>
          Tashfeen
          <span className="block" style={{ color: '#10B981' }}>Aziz</span>
        </h1>

        <p className="font-grotesk font-medium mb-2" style={{ fontSize: '15px', color: '#555' }}>
          AI Engineer · LangGraph & RAG Systems
        </p>

        <p className="font-mono mb-7" style={{ fontSize: '11.5px', color: 'rgba(16,185,129,0.45)' }}>
          // Kotli se Lahore tak — agents bana raha hoon
        </p>

        <p className="leading-relaxed mb-8 max-w-md" style={{ fontSize: '14px', color: '#333' }}>
          Building{' '}
          <span style={{ color: '#555', fontWeight: 500 }}>production-grade agentic AI systems</span>
          {' '}— from LangGraph multi-tool agents to voice-native bookkeeping for Pakistan's informal economy.
        </p>

        <div className="flex flex-wrap gap-2 mb-9">
          {['LangGraph', 'RAG Pipeline', 'Tool-Calling', 'FastAPI', 'Groq LLaMA3'].map(s => (
            <span key={s} className="px-3 py-1 rounded-md font-mono flex items-center gap-1"
              style={{ fontSize: '10.5px', background: 'rgba(99,102,241,0.09)', border: '1px solid rgba(99,102,241,0.2)', color: '#818CF8' }}>
              <span style={{ color: '#10B981', fontSize: '8px' }}>◈</span>
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => document.getElementById('chat-widget')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-grotesk font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#10B981', color: '#080808', fontSize: '14px' }}>
            🤖 Ask my AI
          </button>
          <a href="#projects"
            className="font-grotesk font-semibold px-7 py-3 rounded-xl transition-colors duration-200"
            style={{ color: '#F0FDF4', border: '1px solid #1A1A1A', fontSize: '14px' }}>
            View Projects
          </a>
        </div>
      </div>

      {/* RIGHT: Photo area */}
      <div className="relative hidden md:flex items-end justify-center z-10 overflow-hidden">

        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 85%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />

        <div className="relative w-[320px] h-[500px] flex items-end justify-center">
          {/*
            PHOTO LAGANE KA TARIKA:
            1. remove.bg pe jao → apni photo upload karo → PNG download karo
            2. frontend/public/ folder mein photo.png save karo
            3. Neeche wali placeholder div ko delete karo
            4. Yeh add karo:
               <img src="/photo.png" className="h-full w-full object-contain object-bottom" alt="Tashfeen Aziz" />
          */}
          <img
            src="/photo.png"
            className="h-full w-full object-contain object-bottom"
            alt="Tashfeen Aziz"
          />

          {/* Stat: 3+ */}
          <div className="absolute z-20 rounded-xl px-4 py-3"
            style={{ left: '-16px', top: '28%', background: 'rgba(8,8,8,0.92)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(8px)' }}>
            <div className="font-grotesk font-bold text-xl leading-none" style={{ color: '#10B981' }}>3+</div>
            <div className="font-mono mt-1" style={{ fontSize: '10px', color: '#444' }}>Production AI<br />Systems</div>
          </div>

          {/* Stat: 13k */}
          <div className="absolute z-20 rounded-xl px-4 py-3"
            style={{ right: '-12px', top: '18%', background: 'rgba(8,8,8,0.92)', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(8px)' }}>
            <div className="font-grotesk font-bold text-xl leading-none" style={{ color: '#10B981' }}>13k</div>
            <div className="font-mono mt-1" style={{ fontSize: '10px', color: '#444' }}>LinkedIn<br />Impressions</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-14 z-10 flex items-center gap-2 font-mono" style={{ fontSize: '10px', color: '#2A2A2A' }}>
        <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #10B981, transparent)' }} />
        scroll to explore
      </div>

    </section>
  )
}