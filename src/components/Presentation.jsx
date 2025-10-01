import { useState, useEffect } from 'react'
import Slide from './Slide'
import Navigation from './Navigation'
import SpeakerNotes from './SpeakerNotes'
import QAPanel from './QAPanel'
import { slidesData, qaData } from '../data/presentationData'

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [showQA, setShowQA] = useState(false)

  // Navigation avec clavier
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          previousSlide()
          break
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          event.preventDefault()
          nextSlide()
          break
        case 'Escape':
          setShowQA(false)
          setShowNotes(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col font-sans text-gray-700 overflow-hidden">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm px-8 py-4 flex justify-between items-center border-b-2 border-white/20 relative z-30 md:flex-col md:gap-2 md:text-center md:px-4 md:py-3">
        <h1 className="text-white text-xl font-bold md:text-lg sm:text-base">
          Présentation Autoconsommation Solaire
        </h1>
        <div className="text-white font-bold text-lg bg-white/20 px-4 py-2 rounded-full md:text-xs md:px-2 md:py-1 whitespace-nowrap">
          {currentSlide + 1}/{slidesData.length}
        </div>
      </header>

      {/* Zone des slides */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-8 md:p-2 sm:p-1">
        <Slide 
          data={slidesData[currentSlide]} 
          isActive={true}
        />
      </main>

      {/* Navigation */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={slidesData.length}
        onPrevious={previousSlide}
        onNext={nextSlide}
        onGoToSlide={goToSlide}
      />

      {/* Notes du présentateur */}
      <SpeakerNotes
        show={showNotes}
        notes={slidesData[currentSlide].speech}
        onToggle={() => setShowNotes(!showNotes)}
        qaOpen={showQA}
      />

      {/* Panel Q&A */}
      <QAPanel
        show={showQA}
        qaData={qaData[currentSlide]}
        slideTitle={slidesData[currentSlide].title}
        onToggle={() => setShowQA(!showQA)}
      />
    </div>
  )
}

export default Presentation