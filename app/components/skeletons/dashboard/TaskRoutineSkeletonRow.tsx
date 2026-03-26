
const TaskRoutineSkeletonRow = ({ title, subtitle }: { title: string, subtitle: string }) => {  return (
    <div className="bg-white/3 border w-full  border-white/8 rounded-2xl p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-light text-white">{title}</h2>
        <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {/* Map through tasks here */}
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="h-4 w-4 bg-gray-700 shadow-sm  animate-pulse" />
              <div className="text-white text-sm font-medium">
                <span className="h-3 w-32 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
            <span
              className={`text-xs ml-10 font-medium px-2 py-1 rounded-full  
           
            `}
            >
              <span className="h-1 w-28 bg-gray-700 rounded animate-pulse" />
            </span>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <button className="w-full mt-6 py-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
        View all tasks →
      </button>
    </div>
  );
};

export default TaskRoutineSkeletonRow;
