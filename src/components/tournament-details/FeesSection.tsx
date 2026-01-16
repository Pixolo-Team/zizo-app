"use client";

interface FeesSectionProps {
  entryFee: number;
  advance: number;
}

export default function FeesSection({ entryFee, advance }: FeesSectionProps) {
  return (
    <div className="flex w-full p-5 bg-n-50 rounded-2xl flex-col gap-3 lg:p-7 lg:rounded-3xl border border-n-200">
      {/* Heading */}
      <p className="text-n-500 font-medium lg:text-2xl">Fee Details</p>

      <div className="grid grid-cols-2 gap-3 lg:gap-4 relative">
        {/* Entry Fees */}
        <div className="flex flex-col items-center justify-center gap-1 py-3 lg:gap-2">
          <p className="text-xs text-n-500 font-medium lg:text-base">
            Entry Fee
          </p>
          <p className="text-xl text-n-900 font-semibold leading-tight lg:text-3xl">
            ₹{entryFee.toLocaleString()}
          </p>
        </div>

        {/* Seperator */}
        <div className="w-px h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-n-200"></div>

        {/* Advance Fees */}
        <div className="flex flex-col items-center justify-center gap-1 py-3 lg:gap-2">
          <p className="text-xs text-n-500 font-medium lg:text-base">Advance</p>
          <p className="text-xl text-n-900 font-semibold leading-tight lg:text-3xl">
            {advance ? `₹${advance.toLocaleString()}` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
