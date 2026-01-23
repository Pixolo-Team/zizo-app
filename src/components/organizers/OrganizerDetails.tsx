"use client";
interface OrganizerHeaderProps {
  tournamentsOrganized: string;
  teamsHosted: string;
}

export default function OrganizerDetails({
  tournamentsOrganized,
  teamsHosted,
}: Readonly<OrganizerHeaderProps>) {
  return (
    <div className="bg-n-50 flex flex-col w-full rounded-2xl p-5 lg:p-7 gap-3 lg:rounded-3xl border border-n-200">
        
      {/* Heading */}
      <p className="font-medium text-base lg:text-2xl leading-none tracking-normal text-n-500">
        Organizer Details
      </p>

      {/* Fee Structure */}
      <div className="flex gap-2 w-full lg:gap-8 self-center">
        <div className="flex flex-col w-full rounded-2xl py-3 gap-1 lg:gap-2">
          <p className="font-normal text-xs lg:text-base leading-none tracking-normal text-center text-n-500">
            Tournaments Organized
          </p>
          <p className="font-bold text-lg lg:text-3xl leading-none tracking-normal text-center text-n-900">
            {tournamentsOrganized}
          </p>
        </div>
        {/* Separator */}
        <div className="w-[40px] h-0 border rotate-90 border-n-200 self-center"></div>

        <div className="flex flex-col w-full rounded-2xl py-3 gap-1 lg:gap-2">
          <p className="font-normal text-xs lg:text-base leading-none tracking-normal text-center text-n-500">
            Teams Hosted
          </p>
          <p className="font-bold text-lg lg:text-3xl leading-none tracking-normal text-center text-n-900">
            {teamsHosted}
          </p>
        </div>
      </div>
    </div>
  );
}
