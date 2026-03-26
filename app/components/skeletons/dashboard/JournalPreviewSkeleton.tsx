"use client";

import Link from "next/link";

export default function JournalPreviewSkeleton() {
  return (
    <div className="bg-white/2 border border-white/[0.07] rounded-2xl p-8 grid grid-cols-2 gap-12">
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
          <span className="h-4 w-72 bg-gray-700 shadow-sm  animate-pulse" />
        </p>

        <Link
          href="/dashboard/journal"
          className="mt-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm rounded-lg transition-colors w-fit"
        >
          <div className="h-4 w-32 bg-gray-700 shadow-sm  animate-pulse" />

        </Link>
      </div>

      {/* Right — recent entries */}
      <div className="flex flex-col gap-3">
        <div className="text-xs text-zinc-500 uppercase tracking-widest">
          Recent entries
        </div>

        {/* TODO: map last 3 journals here */}
        {/* Each entry: */}
        <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/2">
          <div className="text-base">
         
            <div className="h-4 w-4 bg-yellow-500 shadow-sm  animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-200 truncate">
             
              <div className="h-4 w-10 bg-gray-700 shadow-sm  animate-pulse" />
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              <div className="h-4 w-4 bg-gray-700 shadow-sm  animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
