"use client";

import { format } from "date-fns";
import {
  createRoutines,
  deleteRoutines,
  fetchRoutines,
  updateRoutines,
} from "@/app/actions/routines";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { QUERY_KEYS } from "@/lib/queryKeys";

export default function RoutinesPage() {
const [selectedRoutine, setSelectedRoutine] = useState<{
  id: number
  activity: string
  time: string
  duration: number
  order: number | null
  completed: boolean
  userId: number
  createdAt: Date
} | null>(null)
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.routines,
    queryFn: async () => {
      const result = await fetchRoutines();
      if (!result.success) throw new Error(result.message);
      return result.routine;
    },
  });

  const { mutate: addRoutine, isPending: isAdding } = useMutation({
    mutationFn: createRoutines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routines"] });
      formRef.current?.reset();
    },
  });
  const { mutate: editRoutine, isPending: isEditing } = useMutation({
    mutationFn: updateRoutines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routines"] });
      formRef.current?.reset();
      setSelectedRoutine(null)
    },
  });
  const { mutate: removeRoutine, isPending: isDeleting } = useMutation({
    mutationFn: deleteRoutines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routines"] });
            formRef.current?.reset();
      setSelectedRoutine(null)

    },
  });
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (selectedRoutine) {
     formData.append('id', String(selectedRoutine.id))
      editRoutine(formData);
    } else {
      addRoutine(formData);
    }
  };

  const displayTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
    return format(date, "h:mm a");
  };
const handleEdit = (routine: NonNullable<typeof selectedRoutine>) => {    setSelectedRoutine(routine);
    console.log(routine, "Routine after clicking on edit");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-light text-white">Routines</h1>
        <p className="text-zinc-500 text-sm mt-2">Manage your daily routines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Routines List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-light text-white mb-6">Your Routines</h2>

          <div className="space-y-3">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading routines</div>}
            {data?.map((routine) => (
              <div
                key={routine.id}
                className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-center justify-between hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{routine.activity}</p>
                  <div className="flex gap-4 mt-2 text-zinc-400 text-sm">
                    <span>{displayTime(routine.time)}</span>
                    <span>{routine.duration} minutes</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(routine)}
                    className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeRoutine(routine.id)}
                    className="px-3 py-1 text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Add/Edit Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-8 backdrop-blur-sm sticky top-8">
            <h2 className="text-lg font-light text-white mb-6">
              Add/Edit Routine
            </h2>

            <form
              key={selectedRoutine?.id ?? "new"}
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                  Activity
                </label>
                <input
                  type="text"
                  defaultValue={selectedRoutine?.activity}
                  name="activity"
                  placeholder="e.g., Morning Routine"
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  defaultValue={selectedRoutine?.time}
                  name="time"
                  className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  defaultValue={selectedRoutine?.duration}
                  name="duration"
                  placeholder="e.g., 30"
                  className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-lg text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isAdding}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors mt-6"
              >
                {selectedRoutine
                  ? "Edit Routine"
                  : isAdding
                    ? "Adding..."
                    : "Add Routine"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
