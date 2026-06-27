import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number
  vx: number; vy: number
  r: number
  glow: number; glowDir: number; glowSpeed: number
}

interface Pulse {
  from: number; to: number; t: number
}

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
    const NODE_COUNT = 55
    const MAX_DIST = 160
    const PULSE_SPEED = 0.012

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function rand(a: number, b: number) { return a + Math.random() * (b - a) }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
        r: rand(1.8, 3.8),
        glow: Math.random(),
        glowDir: Math.random() > 0.5 ? 1 : -1,
        glowSpeed: rand(0.006, 0.018),
      }))
    }

    function maybeSpawnPulse() {
      if (Math.random() > 0.04) return
      const i = Math.floor(Math.random() * nodes.length)
      const neighbors: number[] = []
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) neighbors.push(j)
      }
      if (!neighbors.length) return
      const j = neighbors[Math.floor(Math.random() * neighbors.length)]
      pulses.push({ from: i, to: j, t: 0 })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = 'rgba(245,158,11,' + (0.15 * (1 - dist / MAX_DIST)) + ')'
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      pulses = pulses.filter(p => p.t <= 1)
      pulses.forEach(p => {
        p.t += PULSE_SPEED
        const a = nodes[p.from], b = nodes[p.to]
        const px = a.x + (b.x - a.x) * p.t
        const py = a.y + (b.y - a.y) * p.t
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 10)
        grad.addColorStop(0, 'rgba(251,191,36,0.9)')
        grad.addColorStop(0.4, 'rgba(245,158,11,0.35)')
        grad.addColorStop(1, 'rgba(245,158,11,0)')
        ctx.beginPath()
        ctx.arc(px, py, 10, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,230,100,1)'
        ctx.fill()
      })

      nodes.forEach(n => {
        n.glow += n.glowSpeed * n.glowDir
        if (n.glow > 1 || n.glow < 0.1) n.glowDir *= -1
        const gr = n.r * 3.5 * n.glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr + 6)
        grad.addColorStop(0, 'rgba(245,158,11,' + (0.55 * n.glow) + ')')
        grad.addColorStop(0.5, 'rgba(245,158,11,' + (0.18 * n.glow) + ')')
        grad.addColorStop(1, 'rgba(245,158,11,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, gr + 6, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(251,191,36,' + (0.7 + 0.3 * n.glow) + ')'
        ctx.fill()
        n.x += n.vx; n.y += n.vy
        if (n.x < -20) n.x = W + 20
        if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20
        if (n.y > H + 20) n.y = -20
      })

      maybeSpawnPulse()
      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => { resize(); initNodes() })
    ro.observe(canvas)
    resize(); initNodes(); draw()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <section id="about" className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_70%_50%,transparent_0%,rgba(12,15,26,0.6)_60%,rgba(12,15,26,0.95)_100%)]" />

      <div className="relative z-10 max-w-2xl pt-24">
        <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 text-amber px-4 py-1.5 rounded-full text-xs font-mono mb-7">
          <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_8px_#22C55E] animate-pulse" />
          Open to opportunities · Lahore, Pakistan
        </div>

        <h1 className="font-grotesk font-bold text-6xl md:text-7xl leading-[1.04] tracking-[-2.5px] mb-3">
          Tashfeen<br />
          <span className="text-amber">Aziz</span>
        </h1>

        <p className="font-grotesk text-xl text-muted font-medium tracking-tight mb-4">
          AI Engineer · LangGraph {'&'} RAG Systems
        </p>

        <p className="text-muted text-[15.5px] leading-relaxed mb-10 max-w-lg">
          Building production-grade agentic AI systems — from LangGraph
          multi-tool agents to voice-native bookkeeping for Pakistan's
          informal economy.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => document.getElementById('chat-widget')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber text-bg font-grotesk font-bold text-[15px] px-7 py-3.5 rounded-xl hover:bg-amber-lt transition-all duration-200 hover:-translate-y-0.5"
          >
            🤖 Ask my AI
          </button>
          
            href="#projects"
            className="border border-border text-white font-grotesk font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:border-muted transition-colors duration-200"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  )
}