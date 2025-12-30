"use client";

// COMPONENTS //
import CalendarMark from "@/components/icons/neevo-icons/CalendarMark";
import { formatLongDate } from "@/utils/date";

/** Info Card Props */
interface InfoCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
}

/** Info Card Component */
function InfoCard({ label, value, subValue, icon }: InfoCardProps) {
  return (
    <div className="bg-n-100 rounded-2xl py-3 px-4 flex flex-col h-full gap-3.5 justify-between">
      {/* Icon and Label */}
      <div className="flex gap-1 items-center">
        {icon && <div className="size-4 text-n-500">{icon}</div>}
        <p className="text-xs text-n-500">{label}</p>
      </div>

      {/* Values */}
      <div className="flex flex-col gap-1">
        <p className="text-base text-n-800 leading-none">{value}</p>
        {subValue && (
          <p className="text-xs text-n-600 leading-none">{subValue}</p>
        )}
      </div>
    </div>
  );
}

/** Info Grid Props */
interface InfoGridProps {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  format: string;
  category: string;
}

/** Info Grid Component */
export default function InfoGrid({
  startDate,
  endDate,
  startTime,
  endTime,
  ageGroup,
  format,
  category,
}: InfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* Date and Time */}
      <InfoCard
        label="From"
        value={formatLongDate(startDate)}
        subValue={startTime}
        icon={<CalendarMark className="text-n-500 size-4" />}
      />
      <InfoCard
        label="To"
        value={formatLongDate(endDate)}
        subValue={endTime}
        icon={<CalendarMark className="text-n-500 size-4" />}
      />

      {/* Age Group */}
      <InfoCard label="Age Group" value={ageGroup} />

      {/* Format */}
      <InfoCard label="Format" value={format} subValue={category} />
    </div>
  );
}
