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
    <div className="bg-n-100 rounded-2xl py-3 px-4 flex flex-col h-full gap-3.5 lg:gap-5 justify-between">
      {/* Icon and Label */}
      <div className="flex gap-1 items-center lg:gap-2">
        {icon && <div className="size-4 lg:size-5 text-n-500">{icon}</div>}
        <p className="text-xs lg:text-base text-n-500">{label}</p>
      </div>

      {/* Values */}
      <div className="flex flex-col gap-1 lg:gap-2">
        <p className="text-base lg:text-2xl text-n-800 leading-tight">
          {value}
        </p>
        {subValue && (
          <p className="text-xs lg:text-lg font-semibold text-n-800 leading-tight">
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
    <div className="bg-n-50 p-5 rounded-2xl flex flex-col gap-3  lg:p-7 lg:rounded-3xl lg:gap-3.5">
      <div className="grid grid-cols-2 gap-3">
        {/* Date and Time */}
        <InfoCard
          label="From"
          value={formatLongDate(startDate)}
          subValue={startTime}
          icon={
            <CalendarMark
              primaryColor="var(--color-n-500)"
              className="size-4 lg:size-5"
            />
          }
        />
        <InfoCard
          label="To"
          value={formatLongDate(endDate)}
          subValue={endTime}
          icon={
            <CalendarMark
              primaryColor="var(--color-n-500)"
              className="size-4 lg:size-5"
            />
          }
        />

        {/* Age Group */}
        <InfoCard
          label="Age Group"
          value={ageGroup}
          icon={
            <UserFullBody
              primaryColor="var(--color-n-500)"
              className="size-4 lg:size-5"
            />
          }
        />

        {/* Format */}
        <InfoCard
          label="Format"
          value={format}
          subValue={
            category.replace("_", " + ").charAt(0).toUpperCase() +
            category.replace("_", " + ").slice(1)
          }
          icon={
            <BorderFull
              primaryColor="var(--color-n-500)"
              className="size-4 lg:size-5"
            />
          }
        />
      </div>

      {/* Navigate Link */}
      <Link
        href="#"
        className="flex items-center gap-2 lg:gap-3s rounded-3xl w-full bg-n-100 py-3.5 px-4 lg:py-4 justify-center"
      >
        <TriangleArrowBendDownLeft
          primaryColor="var(--color-n-800)"
          className="size-4 rotate-180 lg:size-5"
        />
        <p className="text-n-800 text-sm lg:text-xl font-medium">
          Navigate to Venue
        </p>
      </Link>
    </div>
  );
}
