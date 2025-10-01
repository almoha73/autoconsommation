const Slide = ({ data, isActive }) => {
  if (!data) return null

  return (
    <div className={`
      bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl text-center 
      transition-all duration-500 ease-out overflow-y-auto w-full
      ${isActive ? 'opacity-100 scale-100' : 'opacity-90 scale-95'}
      
      2xl:p-16 2xl:max-w-5xl 2xl:max-h-[calc(100vh-200px)]
      xl:p-12 xl:max-w-4xl xl:max-h-[calc(100vh-220px)]
      lg:p-10 lg:max-w-3xl lg:max-h-[calc(100vh-240px)]
      md:p-6 md:mx-2 md:rounded-xl md:max-h-[calc(100vh-180px)] md:max-w-full
      sm:p-4 sm:mx-1 sm:rounded-lg sm:max-h-[calc(100vh-160px)]
      p-3 mx-1 rounded-lg max-h-[calc(100vh-140px)]
    `}>
      <h1 className="text-purple-600 font-bold leading-tight break-words hyphens-auto
      2xl:text-6xl 2xl:mb-10 2xl:mt-4
      xl:text-5xl xl:mb-8 xl:mt-3
      lg:text-4xl lg:mb-6 lg:mt-2
      md:text-3xl md:mb-6 md:mt-2
      sm:text-2xl sm:mb-4 sm:mt-2
      text-lg mb-3 mt-2
      [@media(max-width:400px)]:text-base [@media(max-width:400px)]:mb-2 [@media(max-width:400px)]:mt-3">
        {data.title}
      </h1>
      
      {data.emoji && (
        <div className="text-6xl my-8 leading-none md:text-4xl md:my-4 sm:text-3xl sm:my-3">
          {data.emoji}
        </div>
      )}
      
      {data.content && (
        <div className="text-xl leading-relaxed my-8 text-gray-700 md:text-lg md:my-6 sm:text-base sm:my-4">
          {data.content}
        </div>
      )}
      
      {data.points && (
        <div className="text-left max-w-3xl mx-auto space-y-6 md:space-y-4 sm:space-y-3">
          {data.points.map((point, index) => (
            <div key={index} className="flex items-center bg-white/90 p-6 rounded-xl border-l-4 border-pink-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:p-4 md:flex-col md:text-center sm:p-3">
              <span className="text-3xl mr-4 min-w-[3rem] md:text-2xl md:mr-0 md:mb-2 sm:text-xl sm:mb-1">
                {point.icon}
              </span>
              <span className="text-lg font-medium text-gray-700 leading-snug md:text-base sm:text-sm">
                {point.text}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {data.stats && (
        <div className="flex justify-around my-8 flex-wrap gap-4 md:flex-col md:items-center md:space-y-4 sm:space-y-3">
          {data.stats.map((stat, index) => (
            <div key={index} className="bg-white/90 p-8 rounded-2xl min-w-[150px] flex-1 max-w-[200px] shadow-lg md:max-w-full md:w-full md:p-6 sm:p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2 leading-none md:text-3xl sm:text-2xl">
                {stat.number}
              </div>
              <div className="text-gray-700 text-sm leading-tight md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Slide