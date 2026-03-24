"use client";

import { fetchRoutines } from "@/app/actions/routines";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function RoutinesPreview() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.routines,
    queryFn: async () => {
      const result = await fetchRoutines();
      if (!result.success) throw new Error(result.message);
      return result.routine;

    },
  });
  const filteredData = data?.slice(0,3)
  console.log(data, "Routine data in clientside");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;
  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-8 w-full backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-light text-white">Todays Routines</h2>
        <p className="text-zinc-500 text-sm mt-1">Daily habits</p>
      </div>

      {/* Routines List */}
      <div className="space-y-3">
        {/* Map through routines here */}
        {filteredData?.map((el) => (
          <div
            key={el.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors"
          >
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-indigo-500"
            />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{el.activity}</p>
              <p className="text-zinc-500 text-xs">{el.duration} minutes</p>
            </div>
            <div className="ml-10">
              <p className="text-white text-sm  font-medium">{el.time} </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <button className="w-full mt-6 py-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
        View all routines →
      </button>
    </div>
  );
}
