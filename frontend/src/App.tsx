import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Writing from './components/Writing'
import Contact from './components/Contact'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Writing />
      <Contact />
      <ChatWidget />
    </div>
  )
}

export default App