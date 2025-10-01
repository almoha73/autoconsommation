const QAPanel = ({ show, qaData, slideTitle, onToggle }) => {
  return (
    <>
      {/* Bouton Q&A responsive - caché quand panneau ouvert */}
      <button 
        className={`fixed bg-purple-600 text-white border-none p-4 rounded-full cursor-pointer text-xl z-[1001] shadow-lg transition-all duration-300 w-15 h-15 flex items-center justify-center hover:bg-pink-500 hover:scale-105 
        lg:right-6 lg:w-16 lg:h-16 lg:text-2xl lg:top-1/2 lg:-translate-y-1/2
        md:bottom-32 md:top-auto md:right-4 md:transform-none md:w-12 md:h-12 md:text-lg
        sm:bottom-28 sm:right-3 sm:w-10 sm:h-10 sm:text-base sm:p-2
        right-4 top-1/2 -translate-y-1/2
        ${show ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={onToggle}
        title="Afficher/Masquer les questions et réponses"
      >
        ❓
      </button>
      
      {/* Panel responsive - desktop: sidebar droite, mobile: bottom sheet */}
      <div className={`fixed bg-white shadow-2xl overflow-y-auto z-[1000] transition-transform duration-300
        ${show ? 'translate-x-0 translate-y-0' : 'translate-x-full translate-y-full'}
        
        2xl:w-[500px] 2xl:top-0 2xl:right-0 2xl:h-screen 2xl:translate-y-0 ${show ? '2xl:translate-x-0' : '2xl:translate-x-full'}
        
        xl:w-[450px] xl:top-0 xl:right-0 xl:h-screen xl:translate-y-0 ${show ? 'xl:translate-x-0' : 'xl:translate-x-full'}
        
        lg:w-[400px] lg:top-0 lg:right-0 lg:h-screen lg:translate-y-0 ${show ? 'lg:translate-x-0' : 'lg:translate-x-full'}
        
        md:w-full md:h-[80vh] md:bottom-0 md:top-auto md:left-0 md:right-0 md:rounded-t-2xl md:translate-x-0 ${show ? 'md:translate-y-0' : 'md:translate-y-full'}
        
        sm:w-full sm:h-[85vh] sm:bottom-0 sm:top-auto sm:left-0 sm:right-0 sm:rounded-t-2xl sm:translate-x-0 ${show ? 'sm:translate-y-0' : 'sm:translate-y-full'}
        
        w-full h-[90vh] bottom-0 top-auto left-0 right-0 rounded-t-2xl translate-x-0 ${show ? 'translate-y-0' : 'translate-y-full'}
      `}>
        
        {/* Header responsive */}
        <div className="flex justify-between items-center border-b-2 border-gray-200 bg-gradient-to-br from-purple-600 to-pink-500 text-white
        2xl:px-8 2xl:py-6
        xl:px-6 xl:py-5  
        lg:px-5 lg:py-4
        md:px-4 md:py-3
        sm:px-3 sm:py-2
        px-3 py-2">
          <h3 className="font-medium m-0
          2xl:text-2xl
          xl:text-xl
          lg:text-lg  
          md:text-base
          sm:text-sm
          text-sm">
            Questions & Réponses
          </h3>
          <button 
            className="bg-transparent border-none text-white cursor-pointer px-2 py-1 rounded transition-colors duration-200 hover:bg-white/20
            2xl:text-2xl
            xl:text-xl
            lg:text-lg
            md:text-base  
            sm:text-sm
            text-sm"
            onClick={onToggle}
            aria-label="Fermer les Q&A"
          >
            ×
          </button>
        </div>
        
        {/* Contenu responsive */}
        <div className="
        2xl:p-8
        xl:p-6
        lg:p-5
        md:p-4
        sm:p-3  
        p-3">
          {slideTitle && (
            <h4 className="text-purple-600 pb-2 border-b-2 border-gray-200
            2xl:text-xl 2xl:mb-6
            xl:text-lg xl:mb-5
            lg:text-base lg:mb-4
            md:text-sm md:mb-3
            sm:text-xs sm:mb-2
            text-xs mb-2">
              {slideTitle}
            </h4>
          )}
          
          {qaData && qaData.length > 0 ? (
            <div className="flex flex-col
            2xl:gap-6
            xl:gap-5
            lg:gap-4  
            md:gap-3
            sm:gap-2
            gap-2">
              {qaData.map((item, index) => (
                <div key={index} className="bg-gray-100 rounded-xl border-l-4 border-pink-500 transition-transform duration-200 hover:translate-x-1
                2xl:p-6
                xl:p-5
                lg:p-4
                md:p-3
                sm:p-2
                p-2">
                  <div className="text-purple-600 font-bold mb-2
                  2xl:text-lg 2xl:mb-4
                  xl:text-base xl:mb-3
                  lg:text-base lg:mb-3
                  md:text-sm md:mb-2
                  sm:text-sm sm:mb-2  
                  text-sm mb-2">
                    <strong>Q:</strong> {item.q}
                  </div>
                  <div className="text-gray-700 leading-relaxed
                  2xl:text-base
                  xl:text-sm
                  lg:text-sm
                  md:text-sm
                  sm:text-sm
                  text-sm">
                    <strong>R:</strong> {item.a}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 italic
            2xl:mt-8
            xl:mt-6
            lg:mt-5
            md:mt-4
            sm:mt-3
            mt-3">
              <p className="
              2xl:text-base
              xl:text-sm
              lg:text-sm
              md:text-xs
              sm:text-xs
              text-xs">Aucune question spécifique pour cette slide.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {show && (
        <div 
          className="fixed inset-0 bg-black/50 z-[999] backdrop-blur-sm"
          onClick={onToggle}
        />
      )}
    </>
  )
}

export default QAPanel