"use client";

// TYPES //
import { SponsorData } from "@/types/tournament";

export default function SponsorsSection({
  sponsors,
}: {
  sponsors: SponsorData[];
}) {
  return (
    <div className="flex w-full p-5 bg-n-50 rounded-2xl flex-col gap-3 border border-n-200">
      {/* Heading */}
      <p className="text-n-500 font-medium">Our Sponsors</p>

      {/* Sponsors */}
      <div className="flex gap-6 items-center flex-wrap">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="flex flex-col items-center">
            <a
              href={sponsor.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-16 h-16 object-cover"
                src={sponsor.logo_url}
                alt={sponsor.name}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
