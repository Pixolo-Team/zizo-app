// TYPES //
import { OrganizerTestimonialData } from "@/types/tournament";

// COMPONENTS //
import Image from "next/image";

interface TestimonialCardProps {
  testimonialItem: OrganizerTestimonialData;
  avatarUrl: string;
}

/** TestimonialCard Component */
export default function TestimonialCard({
  testimonialItem,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {/* Profile Row */}
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div className="size-12 rounded-4xl overflow-hidden">
          <Image
            src={avatarUrl}
            alt={testimonialItem?.author_name ?? ""}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            role="presentation"
          />
        </div>

        {/* Name + Org */}
        <div className="flex flex-col">
          <p className="text-xl lg:text-2xl font-medium text-n-950 leading-none">
            {testimonialItem?.author_name}
          </p>
          <p className="text-xs lg:text-sm font-bold text-n-500">
            {testimonialItem?.author_role}
          </p>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-sm lg:text-base text-n-600 font-normal leading-snug">
        “{testimonialItem?.quote}”
      </p>
    </div>
  );
}
