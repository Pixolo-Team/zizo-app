"use client";

// TYPES //
import { SponsorData } from "@/types/tournament";

export default function SponsorsSection({
  sponsors,
}: {
  sponsors: SponsorData[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium text-n-950">Our Sponsors</h3>

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
