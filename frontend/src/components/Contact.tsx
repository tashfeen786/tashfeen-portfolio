import { useState } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSend() {
    if (!form.name || !form.email || !form.message) return
    // EmailJS integration aayega baad mein
    console.log(form)
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-14">
          <h2 className="font-grotesk font-bold text-4xl tracking-tight">Contact</h2>
          <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-amber to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-muted text-base leading-relaxed mb-8">
              Open to AI engineering roles, freelance projects, and collaborations. Let's build something useful.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:tashfeen247@gmail.com"
                className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm">
                <Mail size={16} className="text-amber" />
                tashfeen247@gmail.com
              </a>
              <a href="https://github.com/tashfeen786" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm">
                <Github size={16} className="text-amber" />
                github.com/tashfeen786
              </a>
              <a href="https://www.linkedin.com/in/tashfeen-aziz/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-white transition-colors text-sm">
                <Linkedin size={16} className="text-amber" />
                linkedin.com/in/tashfeen-aziz
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {sent ? (
              <div className="bg-green/10 border border-green/30 text-green rounded-xl p-6 font-grotesk font-medium">
                Message sent! I'll get back to you soon.
              </div>
            ) : (
              <>
                <input
                  type="text" placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted outline-none focus:border-amber/50 transition-colors"
                />
                <input
                  type="email" placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted outline-none focus:border-amber/50 transition-colors"
                />
                <textarea
                  placeholder="Tell me about your project or role..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted outline-none focus:border-amber/50 transition-colors resize-none"
                />
                <button
                  onClick={handleSend}
                  className="bg-amber text-bg font-grotesk font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-amber-lt transition-colors duration-200 w-fit"
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}