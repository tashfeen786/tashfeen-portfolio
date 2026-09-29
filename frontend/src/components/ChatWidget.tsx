import { useState, useRef, useEffect } from 'react'

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
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
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
        <div
          className="w-[360px] rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #7c5cfc 0%, #5a3fd4 100%)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                🤖
              </div>
              <div>
                <p className="font-grotesk font-semibold text-sm text-white">Ask Tashfeen's AI</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Powered by AI · Always available</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 p-4 overflow-y-auto" style={{ minHeight: '160px', maxHeight: '300px' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={'text-sm leading-relaxed px-3.5 py-2.5 rounded-xl max-w-[88%] ' +
                  (msg.role === 'bot' ? 'self-start rounded-tl-sm' : 'self-end rounded-tr-sm')}
                style={msg.role === 'bot'
                  ? { background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)', color: '#f0f0f5' }
                  : { background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.25)', color: '#f0f0f5' }}
              >
                {msg.loading ? (
                  <span className="flex gap-1.5 items-center py-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#7c5cfc', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#7c5cfc', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#7c5cfc', animationDelay: '300ms' }} />
                  </span>
                ) : msg.content}
              </div>
            ))}

            {showChips && (
              <div className="flex flex-col gap-2 mt-1">
                {QUICK_CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="text-left px-3 py-2 rounded-lg text-xs font-mono transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(124,92,252,0.05)',
                      border: '1px solid rgba(124,92,252,0.12)',
                      color: '#9b82ff',
                      cursor: 'pointer',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 px-4 pb-4 pt-2" style={{ borderTop: '1px solid #1e1e2e' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask anything about Tashfeen..."
              disabled={loading}
              className="flex-1 rounded-lg px-3 py-2 text-xs outline-none"
              style={{ background: '#0a0a0f', border: '1px solid #1e1e2e', color: '#f0f0f5' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading}
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: loading ? '#3d2e80' : '#7c5cfc',
                color: '#fff',
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
              }}
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-xl hover:scale-105 transition-transform"
        style={{
          background: 'linear-gradient(135deg, #7c5cfc, #5a3fd4)',
          boxShadow: '0 4px 20px rgba(124,92,252,0.35)',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
        }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '🤖'}
      </button>
    </div>
  )
}