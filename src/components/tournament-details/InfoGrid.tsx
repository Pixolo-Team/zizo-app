"use client";

// COMPONENTS //
import CalendarMark from "@/components/icons/neevo-icons/CalendarMark";
import { formatLongDate } from "@/utils/date";
import Link from "next/link";
import TriangleArrowBendDownLeft from "../icons/neevo-icons/TriangleArrowBendDownLeft";
import UserFullBody from "../icons/neevo-icons/UserFullBody";
import BorderFull from "../icons/neevo-icons/BorderFull";

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
        <p className="text-base text-n-800 leading-tight">{value}</p>
        {subValue && (
          <p className="text-xs font-semibold text-n-800 leading-tight">
            {subValue}
          </p>
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
    <div className="bg-n-50 p-5 rounded-2xl flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
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
        <InfoCard
          label="Age Group"
          value={ageGroup}
          icon={<UserFullBody className="text-n-500 size-4" />}
        />

        {/* Format */}
        <InfoCard
          label="Format"
          value={format}
          subValue={
            category.replace("_", " + ").charAt(0).toUpperCase() +
            category.replace("_", " + ").slice(1)
          }
          icon={<BorderFull className="text-n-500 size-4" />}
        />
      </div>

      {/* Navigate Link */}
      <Link
        href="#"
        className="flex items-center gap-2 rounded-3xl w-full bg-n-100 py-3.5 px-4 justify-center"
      >
        <TriangleArrowBendDownLeft className="text-n-800 size-4 rotate-180" />
        <p className="text-n-800 text-sm font-medium">Navigate to Venue</p>
      </Link>
    </div>
  );
}
