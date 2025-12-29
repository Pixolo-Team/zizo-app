// COMPONENTS //
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  organization: string;
  testimonial: string;
  avatarUrl: string;
}

/** TestimonialCard Component */
export default function TestimonialCard({
  name,
  organization,
  testimonial,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <div className="px-5 flex flex-col gap-2.5">
      {/* Profile Row */}
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div className="size-10 rounded-xl overflow-hidden">
          <Image
            src={avatarUrl}
            alt={name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            role="presentation"
          />
        </div>

        {/* Name + Org */}
        <div className="flex flex-col">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs text-neutral-500">{organization}</p>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-xs text-n-600 font-normal leading-snug">
        “{testimonial}”
      </p>
    </div>
  );
}
