import React from "react";

const RoutineSkeleton = () => {
  return (
    <div className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
      <div className="flex-1">
        <p className="text-white font-medium">
          <h1 className="h-6 w-20 rounded bg-gray-700 animate-pulse" />
        </p>
        <div className="flex gap-4 mt-2 text-zinc-400 text-sm">
          <span className="h-3 w-10 rounded  bg-gray-700 animate-pulse" />
          <span className="h-3 w-10 rounded bg-gray-700 animate-pulse" />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition-colors">
          <span className=" text-indigo-700 w-7 h-7 hover:bg-indigo-500/30  animate-pulse" />
        </button>
        <button className="px-3 py-1 text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors">
          <span className=" text-red-700 w-7 h-7   animate-pulse" />
        </button>
      </div>
    </div>
  );
};

export default RoutineSkeleton;
