"use client";

interface FeesSectionProps {
  entryFee: number;
  advance: number;
}

export default function FeesSection({ entryFee, advance }: FeesSectionProps) {
  return (
    <div className="flex w-full px-14 justify-between items-center py-3.5 border-y border-n-200">
      {/* Entry Fees */}
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-xs text-n-500 font-medium">Entry Fee</p>
        <p className="text-xl text-n-900 font-semibold leading-tight">
          ₹{entryFee.toLocaleString()}
        </p>
      </div>

      {/* Advance Fees */}
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-xs text-n-500 font-medium">Advance</p>
        <p className="text-xl text-n-900 font-semibold leading-tight">
          {advance ? `₹${advance.toLocaleString()}` : "N/A"}
        </p>
      </div>
    </div>
  );
}
