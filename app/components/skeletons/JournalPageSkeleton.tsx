const JournalPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] grid grid-cols-[300px_1fr] px-20 font-sans text-white">
      {/* Sidebar */}
      <div className="border-r border-white/[0.07] px-5 py-10 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-7 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="w-7 h-7 bg-gray-700 rounded-lg animate-pulse" />
        </div>
        {[1,2,3].map(i => (
          <div key={i} className="p-4 rounded-xl border border-white/6 bg-white/2">
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-32 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-4 bg-gray-700 rounded animate-pulse ml-2" />
            </div>
            <div className="h-2 w-16 bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-2 w-full bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Writing area */}
      <div className="px-16 py-12 flex flex-col gap-8 max-w-3xl">
        <div className="h-3 w-40 bg-gray-700 rounded animate-pulse" />
        <div className="h-8 w-72 bg-gray-700 rounded animate-pulse" />
        <div className="h-px bg-white/6" />
        <div className="flex flex-wrap gap-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-7 w-24 bg-gray-700 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-3 w-full bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
        <div className="flex gap-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-11 h-11 bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default JournalPageSkeleton