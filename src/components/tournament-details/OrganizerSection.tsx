"use client";

// COMPONENTS //
import Image from "next/image";

interface OrganizerSectionProps {
  organizerId: string;
  name: string;
  imageSrc: string;
}

export default function OrganizerSection({
  organizerId,
  name,
  imageSrc,
}: Readonly<OrganizerSectionProps>) {
  return (
    <div className="flex flex-col gap-3.5">
      <h3 className="text-lg font-medium text-n-950">About the Organizer</h3>
      <div className="flex items-center gap-3">
        {/* Image */}
        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-n-300">
          <Image
            src={imageSrc}
            alt={`${name}-${organizerId}`}
            width={56}
            height={56}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name & See Profile */}
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-lg font-bold leading-none text-n-950">{name}</p>
          {/* <Link
            href={`/organizer/${id}`}
            className="text-sm font-medium leading-none text-green-500 hover:underline"
          >
            See Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
}
