const Navigation = ({ currentSlide, totalSlides, onPrevious, onNext, onGoToSlide }) => {
  return (
    <nav className="bg-white/10 backdrop-blur-sm px-8 py-4 flex justify-between items-center border-t-2 border-white/20 relative z-30 md:flex-wrap md:justify-center md:gap-2 md:px-4 md:py-3 sm:px-2 sm:py-2">
      
      {/* Dots en premier sur mobile */}
      <div className="flex gap-3 items-center md:order-first md:w-full md:justify-center md:mb-2 md:gap-2 sm:gap-1 sm:mb-1">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:scale-110 md:w-3 md:h-3 sm:w-2.5 sm:h-2.5 ${
              index === currentSlide 
                ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/40' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => onGoToSlide(index)}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Boutons Previous/Next */}
      <button 
        className="bg-gradient-to-r from-green-400 to-yellow-400 text-gray-800 border-none px-8 py-3 rounded-full font-bold cursor-pointer transition-all duration-300 text-base min-w-[140px] hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-white/30 disabled:text-white/70 md:px-6 md:py-2 md:text-sm md:min-w-[120px] sm:px-4 sm:py-2 sm:text-xs sm:min-w-[100px]"
        onClick={onPrevious}
        disabled={currentSlide === 0}
      >
        ← Précédent
      </button>
      
      <button 
        className="bg-gradient-to-r from-green-400 to-yellow-400 text-gray-800 border-none px-8 py-3 rounded-full font-bold cursor-pointer transition-all duration-300 text-base min-w-[140px] hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-white/30 disabled:text-white/70 md:px-6 md:py-2 md:text-sm md:min-w-[120px] sm:px-4 sm:py-2 sm:text-xs sm:min-w-[100px]"
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
      >
        Suivant →
      </button>
    </nav>
  )
}

export default Navigation