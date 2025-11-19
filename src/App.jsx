import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="app">
      <Hero isLoaded={isLoaded} />
      <Gallery isLoaded={isLoaded} />
    </div>
  )
}

export default App


