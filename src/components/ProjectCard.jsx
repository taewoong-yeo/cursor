import { useState, useEffect, useRef } from 'react'
import './ProjectCard.css'

const ProjectCard = ({ project, index, isVisible, isHovered, onHover, onLeave, onClick }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const cardRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered])

  return (
    <div
      ref={cardRef}
      className={`project-card ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      data-id={project.id}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        '--accent-color': project.color,
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="project-card-inner">
        <div className="project-number">
          {String(project.id).padStart(2, '0')}
        </div>
        
        <div className="project-content">
          <div className="project-meta">
            <span className="project-category">{project.category}</span>
            <span className="project-year">{project.year}</span>
          </div>
          
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          
          <div className="project-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="project-overlay" />
      </div>
    </div>
  )
}

export default ProjectCard

