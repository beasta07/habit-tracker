const TaskSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-10 py-12 text-white">
      {/* Stats */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Tasks</h1>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">
            Focus on what matters most
          </p>
        </div>
        <button
          
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm rounded-lg transition-colors"
        >
                     <div className="h-5 w-20 bg-indigo-700 rounded animate-pulse mb-2" />

        </button>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-10">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white/2 border border-white/6 rounded-xl p-4">
            <div className="h-8 w-12 bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Priority sections */}
      {[1,2,3].map(i => (
        <div key={i} className="mb-8">
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-2">
            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse" />
            <div className="h-3 w-24 bg-gray-700 rounded animate-pulse" />
            <div className="h-3 w-12 bg-gray-700 rounded animate-pulse ml-auto" />
          </div>
          {[1,2].map(j => (
            <div key={j} className="flex items-center gap-4 px-3 py-3 rounded-xl">
              <div className="w-5 h-5 rounded-full border border-white/10 shrink-0" />
              <div className="h-3 flex-1 bg-gray-700 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TaskSkeleton