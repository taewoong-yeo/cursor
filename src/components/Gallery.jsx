import { useState, useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import './Gallery.css'

const projects = [
  {
    id: 1,
    title: '브랜드 웹사이트 리뉴얼',
    category: 'Corporate',
    year: '2024',
    description: '대형 기업의 브랜드 아이덴티티를 반영한 모던한 웹사이트',
    tags: ['HTML5', 'CSS3', 'JavaScript', '반응형'],
    color: '#ff6b6b',
  },
  {
    id: 2,
    title: '이커머스 플랫폼',
    category: 'E-commerce',
    year: '2024',
    description: '사용자 경험을 최우선으로 한 쇼핑몰 인터페이스',
    tags: ['React', 'SCSS', 'API 연동'],
    color: '#4ecdc4',
  },
  {
    id: 3,
    title: '포트폴리오 웹사이트',
    category: 'Portfolio',
    year: '2023',
    description: '크리에이티브 에이전시의 작품 전시 사이트',
    tags: ['GSAP', 'Three.js', 'WebGL'],
    color: '#95e1d3',
  },
  {
    id: 4,
    title: '모바일 앱 랜딩',
    category: 'Landing',
    year: '2023',
    description: '앱 다운로드 전환율을 높인 마이크로 인터랙션',
    tags: ['Vue.js', '애니메이션', 'A/B 테스트'],
    color: '#f38181',
  },
  {
    id: 5,
    title: '뉴스 미디어 사이트',
    category: 'Media',
    year: '2023',
    description: '빠른 콘텐츠 소비를 위한 최적화된 레이아웃',
    tags: ['WordPress', '커스텀 테마', 'SEO'],
    color: '#aa96da',
  },
  {
    id: 6,
    title: '이벤트 페이지',
    category: 'Campaign',
    year: '2024',
    description: '임팩트 있는 비주얼과 인터랙티브 요소',
    tags: ['Canvas', 'Web Audio', '인터랙션'],
    color: '#fcbad3',
  },
]

const Gallery = ({ isLoaded }) => {
  const [visibleProjects, setVisibleProjects] = useState([])
  const [hoveredProject, setHoveredProject] = useState(null)
  const galleryRef = useRef(null)

  useEffect(() => {
    if (!isLoaded) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.dataset.id)
            setVisibleProjects((prev) => {
              if (!prev.includes(projectId)) {
                return [...prev, projectId]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.05, rootMargin: '50px' }
    )

    const projectElements = galleryRef.current?.querySelectorAll('.project-card')
    projectElements?.forEach((el) => observer.observe(el))

    return () => {
      projectElements?.forEach((el) => observer.unobserve(el))
    }
  }, [isLoaded])

  const handleProjectClick = (project) => {
    console.log('Project clicked:', project.title)
  }

  return (
    <section className="gallery" ref={galleryRef}>
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">작업물</h2>
          <p className="gallery-description">
            다양한 프로젝트에서 쌓은 경험과 노하우
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleProjects.includes(project.id)}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

