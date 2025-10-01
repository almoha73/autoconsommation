const SpeakerNotes = ({ show, notes, onToggle, qaOpen }) => {
  return (
    <>
      {/* Bouton positionné à gauche du centre pour éviter les conflits - caché si Q&A ouvert */}
      <button 
        className={`fixed left-4 top-1/2 -translate-y-1/2 bg-pink-500 text-white border-none p-4 rounded-full cursor-pointer text-xl z-[1001] shadow-lg transition-all duration-300 w-15 h-15 flex items-center justify-center hover:bg-purple-600 hover:scale-105 md:left-4 md:bottom-32 md:top-auto md:transform-none md:w-12 md:h-12 md:text-base sm:left-3 sm:w-10 sm:h-10 sm:text-sm sm:bottom-28 sm:p-2 ${qaOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={onToggle}
        title="Afficher/Masquer les notes du présentateur"
      >
        📝
      </button>
      
      {/* Panel qui monte du bas */}
      <div className={`fixed bottom-0 left-0 right-0 bg-black/95 text-white p-0 max-h-[40vh] overflow-y-auto z-[1000] backdrop-blur-lg transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'} md:max-h-[45vh] md:rounded-t-2xl sm:max-h-[50vh]`}>
        <div className="flex justify-between items-center px-8 py-4 border-b border-white/20 bg-black/80 md:px-4 md:py-3 sm:px-3 sm:py-2">
          <h3 className="text-yellow-400 text-xl font-medium m-0 md:text-lg sm:text-base">
            📝 Notes du présentateur
          </h3>
          <button 
            className="bg-transparent border-none text-white text-2xl cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20 md:text-xl sm:text-lg"
            onClick={onToggle}
            aria-label="Fermer les notes"
          >
            ×
          </button>
        </div>
        <div className="px-8 py-6 leading-relaxed text-base md:px-4 md:py-4 md:text-sm sm:px-3 sm:py-3 sm:text-xs">
          {notes}
        </div>
      </div>
    </>
  )
}

export default SpeakerNotes