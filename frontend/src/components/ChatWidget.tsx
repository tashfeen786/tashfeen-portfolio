import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'bot'
  content: string
  loading?: boolean
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const QUICK_CHIPS = [
  'Tell me about Tashfeen',
  'Explain NetsolChatbot',
  'Explain AI Voice Khata',
  'What are his AI skills?',
  'Is he open to work?',
  'How to contact him?',
]

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showChips, setShowChips] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm Tashfeen's AI assistant. Ask me anything or pick a quick question below 👇" }
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    setShowChips(false)
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)
    setMessages(prev => [...prev, { role: 'bot', content: '', loading: true }])

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'bot', content: data.response || 'No response.', loading: false }
        return updated
      })
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'bot', content: 'Something went wrong. Try again.', loading: false }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="chat-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {open && (
        <div className="w-[360px] rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: '#111111', border: '1px solid #1A1A1A' }}>

          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                style={{ background: 'rgba(255,255,255,0.2)' }}>🤖</div>
              <div>
                <p className="font-grotesk font-semibold text-sm" style={{ color: '#fff' }}>Ask Tashfeen's AI</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Powered by Groq · Always available</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: 'rgba(255,255,255,0.7)' }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 p-4 overflow-y-auto" style={{ minHeight: '160px', maxHeight: '300px' }}>
            {messages.map((msg, i) => (
              <div key={i}
                className={'text-sm leading-relaxed px-3.5 py-2.5 rounded-xl max-w-[88%] ' +
                  (msg.role === 'bot' ? 'self-start rounded-tl-sm' : 'self-end rounded-tr-sm')}
                style={msg.role === 'bot'
                  ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#F0FDF4' }
                  : { background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.22)', color: '#F0FDF4' }}>
                {msg.loading ? (
                  <span className="flex gap-1 items-center py-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#10B981', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#10B981', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#10B981', animationDelay: '300ms' }} />
                  </span>
                ) : msg.content}
              </div>
            ))}

            {/* Quick chips */}
            {showChips && (
              <div className="flex flex-col gap-2 mt-1">
                {QUICK_CHIPS.map(chip => (
                  <button key={chip} onClick={() => sendMessage(chip)}
                    className="text-left px-3 py-2 rounded-lg text-xs font-mono transition-all duration-150 hover:-translate-y-0.5"
                    style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', color: '#10B981' }}>
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 px-4 pb-4 pt-2" style={{ borderTop: '1px solid #1A1A1A' }}>
            <input type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask anything about Tashfeen..."
              disabled={loading}
              className="flex-1 rounded-lg px-3 py-2 text-xs outline-none"
              style={{ background: '#080808', border: '1px solid #1A1A1A', color: '#F0FDF4' }} />
            <button onClick={() => sendMessage(input)} disabled={loading}
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: loading ? '#065f46' : '#10B981', color: '#080808', border: 'none', cursor: 'pointer' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl hover:scale-105 transition-transform"
        style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.4)', border: 'none', cursor: 'pointer' }}>
        {open ? '✕' : '🤖'}
      </button>
    </div>
  )
}