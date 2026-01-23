"use client";

// COMPONENTS //
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  // Define Navigation
  const router = useRouter();
  return (
    <div
      className="flex w-full p-5 bg-n-50 rounded-2xl flex-col gap-3 border border-n-200 lg:p-7 lg:rounded-3xl"
      onClick={() => router.push(`/organizers/${organizerId}`)}
    >
      {/* Heading */}
      <p className="text-n-500 font-medium lg:text-2xl">Organizer Details</p>
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
