"use client";

import { fetchTasks } from "@/app/actions/task";
import { useQuery } from "@tanstack/react-query";

export default function TasksPreview() {

  
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
  const result = await fetchTasks()
  console.log('fetchTasks result:', result)  // See what you're getting
  if (!result.success) throw new Error(result.message)
  return result.tasks
}
  });
const filteredData = data?.filter(task => task.priority === 'HIGH')
  console.log(data, "TASKS IN DATA");
if (isLoading) return <div className="text-zinc-500">Loading tasks...</div>
if (error) return <div className="text-zinc-500">Error loading tasks</div>
if (!data || data.length === 0) return <div className="text-zinc-500">No tasks yet</div>

  return (
    <div className="bg-white/3 border w-full border-white/8 rounded-2xl p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-light text-white">Tasks</h2>
        <p className="text-zinc-500 text-sm mt-1">Your to-dos</p>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {/* Map through tasks here */}
          {filteredData?.length === 0 && <p className="text-zinc-500 text-sm">No high priority tasks</p>}
        {filteredData?.map((el) => (
          <div
            key={el.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-indigo-500"
              />
              <p className="text-white text-sm font-medium">{el.activity}</p>
            </div>
            <span
              className={`text-xs ml-10 font-medium px-2 py-1 rounded-full  
            ${el.priority === "HIGH" ? "text-red-400 bg-red-500/20" : ""}
            ${el.priority === "LOW" ? "text-blue-400 bg-blue-500/20" : ""}
            ${el.priority === "MEDIUM" ? "text-yellow-400 bg-yellow-500/20" : ""}

            `}
            >
              {el.priority}
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
}
