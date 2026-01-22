import Image from "next/image";
import Link from "next/link";

interface SuggestedTournamentCardProps {
  name: string;
  location: string;
  imageUrl?: string;
  viewLink: string;
}

export default function SuggestedTournamentCard({
  name,
  location,
  imageUrl,
  viewLink,
}: SuggestedTournamentCardProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className="flex items-center gap-8 justify-between">
      <div className="flex items-center gap-3">
        {/* Image */}
        <Image
          src={imageUrl || "/images/default/suggested-tournament-default.png"}
          alt=""
          width={50}
          height={50}
          className="rounded-full size-12"
        />

        {/* Name and Location */}
        <div className="flex flex-col gap-0.5">
          <p className="text-n-950 text-xl font-medium leading-tight">{name}</p>
          <p className="text-n-700 font-normal leading-tight">{location}</p>
        </div>
      </div>

      {/* View Button */}
      {/* View Button */}
      <Link
        href={viewLink}
        className="group inline-flex items-center gap-1 font-medium text-lime-500 transition-colors duration-200"
      >
        <span className="relative">
          View
          {/* underline reveal */}
          <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-lime-500 transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>
    </div>
  );
}
