"use client";

// COMPONENTS //
import RunIcon from "@/components/icons/neevo-icons/Running";
import SoccerIcon from "@/components/icons/neevo-icons/Soccer";
import Shirt from "@/components/icons/neevo-icons/Shirt";

interface AwardItem {
  icon: React.ReactNode;
  label: string;
  amount: number;
}

const mockAwards: AwardItem[] = [
  {
    icon: (
      <RunIcon
        className=" size-5 lg:size-[30px]"
        primaryColor="var(--color-n-600)"
      />
    ),
    label: "Best Player",
    amount: 10000,
  },
  {
    icon: (
      <SoccerIcon
        className="size-5 lg:size-[30px]"
        primaryColor="var(--color-n-600)"
      />
    ),
    label: "Best Player",
    amount: 10000,
  },
  {
    icon: (
      <Shirt
        className=" size-5 lg:size-[30px]"
        primaryColor="var(--color-n-600)"
      />
    ),
    label: "Best Goalkeeper",
    amount: 10000,
  },
];

export default function AwardsSection() {
  return (
    <div className="flex w-full p-5 bg-n-50 rounded-2xl flex-col gap-3 border border-n-200 lg:p-7 lg:rounded-3xl">
      {/* Heading */}
      <p className="text-n-500 font-medium lg:text-2xl">Honours & Awards</p>
      <div className="grid grid-cols-3 gap-2 lg:gap-5">
        {mockAwards.map((award, index) => (
          <div
            key={index}
            className="bg-n-100 rounded-2xl justify-between flex flex-col p-2.5 lg:p-5 gap-3 lg:gap-5"
          >
            <div className="size-5 text-n-950 lg:size-[30px]">{award.icon}</div>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] text-n-800 leading-none font-semibold lg:text-xl">
                {award.label}
              </p>
              <p className="text-sm font-normal lg:text-base text-n-800">
                {" "}
                {"₹" + award.amount.toLocaleString() + " & Trophy"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
