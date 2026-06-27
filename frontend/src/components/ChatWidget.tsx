import { useState } from 'react'
import { X, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'bot'
  content: string
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm Tashfeen's AI assistant. Ask me about his projects, skills, or availability 👋" }
  ])

  function handleSend() {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'AI backend integration coming soon — stay tuned!'
      }])
    }, 600)
  }

  return (
    <div id="chat-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {open && (
        <div className="w-[340px] bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">

          <div className="bg-gradient-to-r from-purple to-indigo-600 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-base">
                🤖
              </div>
              <div>
                <p className="font-grotesk font-semibold text-sm text-white">Ask Tashfeen's AI</p>
                <p className="text-[11px] text-white/70">Powered by Groq + RAG</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-3 p-4 min-h-[180px] max-h-[300px] overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={'text-sm leading-relaxed px-3.5 py-2.5 rounded-xl max-w-[88%] ' +
                  (msg.role === 'bot'
                    ? 'bg-purple/10 border border-purple/20 self-start rounded-tl-sm'
                    : 'bg-amber/10 border border-amber/25 self-end rounded-tr-sm')}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="flex gap-2 px-4 pb-4 pt-2 border-t border-border">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about Tashfeen..."
              className="flex-1 bg-bg border border-border rounded-lg px-3 py-2 text-xs text-white placeholder:text-muted outline-none focus:border-amber/40 transition-colors"
            />
            <button
              onClick={handleSend}
              className="bg-amber text-bg w-9 h-9 rounded-lg flex items-center justify-center hover:bg-amber-lt transition-colors flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-gradient-to-br from-purple to-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(124,58,237,0.5)] hover:scale-105 transition-transform"
      >
        🤖
      </button>
    </div>
  )
}