import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Capabilities from './components/Capabilities'
import Education from './components/Education'
import Contact from './components/Contact'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary grid-bg">
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Education />
        <Contact />
      </main>
      <ChatWidget />
    </div>
  )
}

export default App