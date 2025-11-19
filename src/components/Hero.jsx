import { useState, useEffect, useRef } from 'react'
import './Hero.css'

const Hero = ({ isLoaded }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isVisible, setIsVisible] = useState(false)
  const [textRevealed, setTextRevealed] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setIsVisible(true), 100)
      setTimeout(() => setTextRevealed(true), 500)
    }
  }, [isLoaded])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        const heroHeight = heroRef.current.offsetHeight
        const opacity = Math.max(0, 1 - scrolled / heroHeight)
        heroRef.current.style.opacity = opacity
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className={`hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-grid" />
      
      <div 
        className="hero-bg"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 107, 107, 0.2) 0%, transparent 60%)`
        }}
      />
      
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <div className="hero-badge">
            <span>Web Publisher</span>
          </div>
          <h1 className="hero-title">
            <span className={`line ${textRevealed ? 'revealed' : ''}`}>
              <span className="word">웹</span>
              <span className="word">퍼블리셔</span>
            </span>
            <span className={`line ${textRevealed ? 'revealed' : ''}`}>
              <span className="word">포트폴리오</span>
            </span>
          </h1>
          <p className={`hero-subtitle ${textRevealed ? 'revealed' : ''}`}>
            디자인과 코드의 경계를 넘나드는
            <br />
            웹 에이전시 경력의 작업물들
          </p>
        </div>

        <div className={`hero-scroll-indicator ${textRevealed ? 'revealed' : ''}`}>
          <div className="scroll-line" />
          <span>스크롤</span>
        </div>
      </div>

      <div className="hero-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="hero-gradient-overlay" />
    </section>
  )
}

export default Hero

