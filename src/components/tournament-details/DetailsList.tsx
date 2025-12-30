"use client";

// COMPONENTS //
import FileReportIcon from "@/components/icons/neevo-icons/FileReport";

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// Detail Item Component
function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="bg-n-100 rounded-[16px] py-3 px-4 flex items-center gap-2.5">
      <div className="w-10 h-10 bg-n-50/80 rounded-[12px] flex items-center justify-center text-n-500 border border-n-300">
        <div className="size-4 text-n-700">{icon}</div>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <p className="text-sm font-bold text-n-950 leading-none">{label}</p>
        <p className=" text-n-800 leading-none">{value}</p>
      </div>
    </div>
  );
}

interface DetailsListProps {
  matchFormat: string;
  tournamentFormat: string;
  minMatches: string;
  fillingFast?: boolean;
}

export default function DetailsList({
  matchFormat,
  tournamentFormat,
  minMatches,
  fillingFast,
}: DetailsListProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Heading */}
      <h3 className="text-[16px] font-medium text-n-950 mb-3">
        Tournament Details
      </h3>

      {/* List */}
      <div className="flex flex-col gap-3">
        <DetailItem
          icon={<FileReportIcon className="text-n-700 size-4" />}
          label="Match Format"
          value={matchFormat}
        />
        <DetailItem
          icon={<FileReportIcon className="text-n-700 size-4" />}
          label="Tournament Format"
          value={tournamentFormat}
        />
        <DetailItem
          icon={<FileReportIcon className="text-n-700 size-4" />}
          label="Matches"
          value={minMatches}
        />
        <DetailItem
          icon={<FileReportIcon className="text-n-700 size-4" />}
          label="Available Slots"
          value={fillingFast ? "Filling Fast" : "Available"}
        />
      </div>
    </div>
  );
}
