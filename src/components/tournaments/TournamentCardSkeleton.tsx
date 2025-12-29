"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function TournamentCardSkeleton() {
  return (
    <div className="rounded-4xl bg-n-50 overflow-hidden w-full">
      {/* Image */}
      <div className="relative rounded-3xl overflow-hidden">
        <Skeleton className="bg-n-200 h-[195px] w-full" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          {/* Title + price */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3.5 w-44" />
              <Skeleton className="h-3.5 w-24" />
            </div>

            <Skeleton className="h-3.5 w-16" />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Skeleton className="h-9 w-36 rounded-3xl" />
            <Skeleton className="h-9 w-24 rounded-3xl" />
            <Skeleton className="h-9 w-24 rounded-3xl" />
          </div>
        </div>

        {/* Winning prize + arrow */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-5 w-36" />
          </div>

          <Skeleton className="h-3.5 w-6" />
        </div>
      </div>
    </div>
  );
}
