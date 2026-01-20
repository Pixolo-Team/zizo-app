"use client";

interface RulesAndRegulationsProps {}

const RULES = [
  "Teams are required to arrive at the venue at least 30 minutes before kickoff for verification.",
  "Match rules, formats, and timings will be shared by the organisers.",
  "Any misconduct or rule violations may lead to disqualification.",
  "Organisers may adjust schedules if required due to operational or weather conditions.",
];

/** Rules and Regulations */
export default function RulesAndRegulations({}: RulesAndRegulationsProps) {
  return (
    <div className="flex w-full p-5 bg-n-50 rounded-2xl flex-col gap-6 border border-n-200 lg:p-7 lg:rounded-3xl">
      {/* Heading */}
      <p className="text-n-500 font-medium lg:text-2xl">
        Rules and Instructions
      </p>

      {/* Rules */}
      <ol className="flex flex-col gap-3 list-disc pl-5 text-xs text-n-500 lg:text-base">
        {RULES.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ol>

      <p className="text-[10px] text-n-500 text-center font-semibold lg:text-sm">
        All tournament details and any updates are managed by the organiser.
        Zizo is not responsible for changes or disputes.
      </p>
    </div>
  );
}
