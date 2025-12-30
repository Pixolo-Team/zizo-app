"use client";

import { useState } from "react";

interface Prize {
  position: string;
  amount: number;
}

interface PrizePoolProps {
  totalPool: number;
  prizes: Prize[];
}

export default function PrizePool({ totalPool, prizes }: PrizePoolProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end py-3.5 border-b border-n-200">
        {/* Header */}
        <div className="flex flex-col gap-1">
          {/* Left Title  */}
          <p className="text-xs text-n-500">Prize Pool</p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-xl font-semibold text-n-900 leading-tight">
              ₹{totalPool.toLocaleString()}
            </h2>
            <span className="text-sm text-n-500 leading-normal">and more</span>
          </div>
        </div>

        {/* See More / Less Button */}
        {prizes.length > 0 && (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1 text-xs text-green-500 font-medium leading-relaxed"
          >
            {isOpen ? "See Less" : "See Below"}

            {/* Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              className={`transition-transform duration-300 transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M0.600098 0.600098L5.6001 5.6001L10.6001 0.600098"
                stroke="#00C950"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* List */}
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-n-100 last:border-0 px-3 py-3"
          >
            {/* Position Number and text */}
            <div className="flex items-center gap-2.5">
              {/* Position Number */}
              <div className="size-[18.6px] px-[3px] rounded-[6px] bg-n-700 text-n-50 flex items-center justify-center text-sm font-bold -rotate-45">
                <p className="rotate-45">{index + 1}</p>
              </div>
              {/* Position Text */}
              <p className="text-lg text-n-950">{prize.position}</p>
            </div>

            {/* Prize Amount */}
            <div className="flex flex-col items-end">
              <p className="text-n-950 font-bold leading-normal">
                ₹{prize.amount.toLocaleString()}
              </p>
              <p className="text-xs text-n-600 leading-[14px]">
                Trophy & Medals
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
