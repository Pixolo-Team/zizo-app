"use client";

interface TournamentHeroProps {
  title: string;
  location: string;
  entryFee: number;
}

export default function TournamentHero({
  title,
  location,
  entryFee,
}: Readonly<TournamentHeroProps>) {
  return (
    <div className="relative w-full flex flex-col gap-7">
      {/* Info Content */}
      {/* Title + price */}
      <div className="flex justify-between items-start">
        {/* Title + location */}
        <div className={`flex flex-col justify-start items-start gap-1.5`}>
          <p className="justify-start text-n-900 text-xl font-medium leading-none">
            {title}
          </p>

          {/* Location */}
          <p className="justify-start text-n-500 text-md font-normal ">
            {location}
          </p>
        </div>

        {/* Price */}
        <p className="justify-start text-green-500 text-lg font-bold leading-6 rounded-full">
          ₹{entryFee}
        </p>
      </div>
    </div>
  );
}
