"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { format } from "date-fns";
import {
  createTasks,
  deleteTasks,
  fetchTasks,
  toggleTasks,
  updateTasks,
} from "@/app/actions/task";
import TaskSkeleton from "@/app/components/skeletons/TaskSkeleton";
import toast from "react-hot-toast";

export default function TasksPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | {
    id: number;
    activity: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    deadline: Date;
    completed: boolean;
    userId: number;
    createdAt: Date;
  }>(null);
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const { data: tasks, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const result = await fetchTasks();
      if (!result.success) throw new Error(result.message);
      return result.tasks;
    },
  });
  const { mutate: addTasks } = useMutation({
    mutationFn: createTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSelectedTask(null);
      setPanelOpen(false);
      toast.success('Task added!')

    },
  });
  const { mutate: update } = useMutation({
    mutationFn: updateTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSelectedTask(null);
      setPanelOpen(false);
      toast.success('Task Updaterd!')

    },
  });

  const { mutate: removeTasks } = useMutation({
    mutationFn: deleteTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSelectedTask(null);
      setPanelOpen(false);
      toast.success('Task Removed!')

    },
  });

  const { mutate: toggleComplete } = useMutation({
    mutationFn: toggleTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success('Task updatee!')

    },
  });

  const highTasks = tasks?.filter((task) => task.priority === "HIGH") ?? [];
  const mediumTasks = tasks?.filter((task) => task.priority === "MEDIUM") ?? [];
  const lowTasks = tasks?.filter((task) => task.priority === "LOW") ?? [];

  const openPanel = (task: typeof selectedTask = null) => {
    setSelectedTask(task);
    setPanelOpen(true);
  };
  const closePanel = () => {
    setSelectedTask(null);
    setPanelOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (selectedTask) {
      formData.append("id", String(selectedTask.id));
      update(formData);
    } else {
      addTasks(formData);
    }
  };
  const completedTasks = tasks?.filter((task) => task.completed).length ?? 0;
  const overdueTasks =
    tasks?.filter(
      (task) => !task.completed && new Date(task.deadline) < new Date(),
    ).length ?? 0;

  if (isPending)
    return (
      <div className="min-h-screen bg-[#0a0a0f] px-10 py-12">
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <TaskSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0f] lg:px-20 md:px-8 px-4 py-12 font-sans text-white relative overflow-hidden">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Tasks</h1>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">
            Focus on what matters most
          </p>
        </div>
        <button
          onClick={() => openPanel()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm rounded-lg transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white/2 border border-white/6 rounded-xl p-4">
          <div className="text-2xl font-light">{tasks?.length}</div>
          {/* TODO: total count */}
          <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
            Total
          </div>
        </div>
        <div className="bg-white/2 border border-white/6 rounded-xl p-4">
          <div className="text-2xl font-light">{completedTasks}</div>
          {/* TODO: completed count */}
          <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
            Completed
          </div>
        </div>
        <div className="bg-white/2 border border-white/6 rounded-xl p-4">
          <div className="text-2xl font-light text-red-400">{overdueTasks}</div>
          {/* TODO: overdue count */}
          <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
            Overdue
          </div>
        </div>
      </div>

      {/* Priority sections */}

      {[
        { label: "High priority", color: "bg-red-400", tasks: highTasks },
        {
          label: "Medium priority",
          color: "bg-orange-400",
          tasks: mediumTasks,
        },
        { label: "Low priority", color: "bg-green-400", tasks: lowTasks },
      ].map(({ label, color, tasks }) => (
        <div key={label} className="mb-8">
          <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-xs uppercase tracking-widest text-zinc-500">
              {label}
            </span>
            <span className="text-xs text-zinc-700 ml-auto">
              {tasks.length} tasks
            </span>
          </div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/3 transition-colors"
            >
              <button
                className={`w-5 h-5 hidden rounded-full border shrink-0 transition-colors ${task.completed ? "bg-indigo-500 border-indigo-500" : "border-white/10 hover:border-indigo-500"}`}
              />
              <span
                className={`flex-1 text-sm ${task.completed ? "line-through text-zinc-600" : "text-zinc-200"}`}
              >
                {task.activity}
              </span>
              <span
                className={`text-xs ${new Date(task.deadline) < new Date() && !task.completed ? "text-red-400" : "text-zinc-500"}`}
              >
                {format(new Date(task.deadline), "MMM d")}
                {new Date(task.deadline) < new Date() && !task.completed
                  ? " · overdue"
                  : ""}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 rounded-full border shrink-0 transition-colors ${task.completed ? "bg-indigo-500 border-indigo-500" : "border-white/10 hover:border-indigo-500"}`}
                />
                <button
                  onClick={() => openPanel(task)}
                  className="px-2 py-1 cursor-pointer  text-xs bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-md transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    removeTasks(task.id);
                  }}
                  className="px-2 py-1 cursor-pointer  text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      {tasks && (tasks.length === 0 && <p className="text-zinc-500 text-sm">No Tasks Added Yet</p>)}
      {/* Overlay */}
      {panelOpen && (
        <div onClick={closePanel} className="fixed inset-0 bg-black/50 z-10" />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#111116] border-l border-white/8 p-8 z-20 flex flex-col transition-transform duration-300 ${panelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-base font-light">
            {selectedTask ? "Edit task" : "Add task"}
          </h2>
          <button
            onClick={closePanel}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-lg"
          >
            ×
          </button>
        </div>

        <form
          key={selectedTask?.id ?? "new"}
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-5"
        >
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Activity
            </label>
            <input
              type="text"
              name="activity"
              defaultValue={selectedTask?.activity}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2.5 bg-white/4 border border-white/8rounded-lg text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-indigo-500/40 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Priority
            </label>
            <select
              name="priority"
              defaultValue={selectedTask?.priority ?? "MEDIUM"}
              className="w-full px-3 py-2.5 bg-white/4 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/40 transition-colors"
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              defaultValue={
                selectedTask?.deadline
                  ? format(new Date(selectedTask.deadline), "yyyy-MM-dd")
                  : ""
              }
              className="w-full px-3 py-2.5 bg-white/4 border border-white/9 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/40 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="mt-auto w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm rounded-lg transition-colors"
          >
            {selectedTask ? "Save changes" : "Add task"}
          </button>
        </form>
      </div>
    </div>
  );
}
