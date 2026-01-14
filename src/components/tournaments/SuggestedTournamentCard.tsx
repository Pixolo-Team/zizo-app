import Image from "next/image";
import Link from "next/link";

export default function SuggestedTournamentCard() {
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
          src={"/images/default/suggested-tournament-default.png"}
          alt=""
          width={50}
          height={50}
          className="rounded-full size-12"
        />

        {/* Name and Location */}
        <div className="flex flex-col gap-0.5">
          <p className="text-n-950 text-xl font-medium leading-tight">
            Tournament Name
          </p>
          <p className="text-n-700 font-normal leading-tight">Location</p>
        </div>
      </div>

      {/* View Button */}
      <Link href="/" className="text-lime-500 font-medium">
        <p>View</p>
      </Link>
    </div>
  );
}
