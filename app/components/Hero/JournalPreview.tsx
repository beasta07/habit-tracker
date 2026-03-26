"use client";

import { fetchJournals } from "@/app/actions/journal";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { format } from "date-fns";
import JournalPreviewSkeleton from "../skeletons/dashboard/JournalPreviewSkeleton";

const MOODS = ["😔", "😕", "😐", "🙂", "😄"];
type Journal = {
  id: number;
  title: string;
  content: string;
  mood: number;
  prompt: string | null;
  userId: number;
  createdAt: Date;
};
export default function JournalPreview() {
  // TODO: useQuery for journals
  const { data: journals , isPending,error } = useQuery({
    queryKey: ["journals"],
    queryFn: async () => {
      const result = await fetchJournals();
      if (!result?.success) {
        throw new Error(result?.message);
      }
      return result.journals;
    },
  });

  const today = new Date().toDateString();
  const todayEntry = journals?.find(
    (journal: Journal) => new Date(journal.createdAt).toDateString() === today,
  );
  const recentEntries = journals?.slice(0,3)
  if (isPending) return <JournalPreviewSkeleton />
  if (!journals || journals.length === 0) return <div className="text-zinc-500">No Journals yet</div>

  return (
    <div className="bg-white/2 border border-white/[0.07] rounded-2xl p-8 grid lg:grid-cols-2 md:grid-cols-1 gap-12">
      {/* Left — check in */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-light text-white">Journal</h2>
          <Link
            href="/dashboard/journal"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            View all →
          </Link>
        </div>

        <p className="text-sm text-zinc-500">
          {/* TODO: if todayEntry exists show "You've checked in today" else show "Ready to check in?" */}
          {todayEntry
            ? "You've checked in today"
            : "Ready to check in? How are you feeling today?"}
        </p>

        <Link
          href="/dashboard/journal"
          className="mt-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm rounded-lg transition-colors w-fit"
        >
          {todayEntry ? "Edit today's entry" : "Write today's entry"}
        </Link>
      </div>

      {/* Right — recent entries */}
      <div className="flex flex-col gap-3">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">
          Recent entries
        </span>

        {/* Each entry: */}
        {recentEntries?.map((journal:Journal) => (
          <div
            key={journal.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/2"
          >
            <span className="text-base">{MOODS[journal.mood - 1]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-200 truncate">{journal.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {format(new Date(journal.createdAt), "MMM d")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
