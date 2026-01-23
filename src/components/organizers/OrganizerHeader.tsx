"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import Image from "next/image";
import LocationPin from "../icons/neevo-icons/LocationPin";

interface OrganizerHeaderProps {
  posterUrl: string | undefined | null;
  name: string | undefined;
  location: string;
}

export default function OrganizerHeader({
  posterUrl,
  name,
  location,
}: Readonly<OrganizerHeaderProps>) {
  const defaultImage = "/images/default/tournament-card-thumbnail.png";

  // Define States
  const [hasError, setHasError] = useState(false);
  const [prevPosterUrl, setPrevPosterUrl] = useState(posterUrl);

  // If posterUrl changes, reset error state
  if (posterUrl !== prevPosterUrl) {
    setPrevPosterUrl(posterUrl);
    setHasError(false);
  }

  // Calculate image Source
  const imageSrc =
    !hasError && posterUrl && posterUrl.trim() !== ""
      ? posterUrl
      : defaultImage;

  return (
    <div className="border-n-200 bg-n-50 rounded-2xl border flex flex-col gap-0 lg:rounded-3xl">
      {/* Card Image */}
      <Image
        src={imageSrc}
        alt="Organizer Header"
        width={200}
        height={200}
        className="h-[200px] md:h-[280px] xl:h-[340px] w-full object-cover rounded-2xl lg:rounded-3xl"
        loading="eager"
        onError={() => setHasError(true)}
      />
      {/* Bottom details */}
      <div className="flex gap-2.5 pt-3.5 px-5 pb-1.5 lg:gap-5 lg:pt-7 lg:pb-9 lg:px-7">
        <div className="flex flex-col gap-1.5">
          <p className="text-n-900 font-medium text-xl leading-none tracking-normal lg:text-3xl">
            {name}
          </p>
          {location !== "" && (
            <div className="flex gap-1.5 lg:gap-[6px]">
              <LocationPin
                className="size-3 lg:size-3.5"
                primaryColor="var(--color-n-500)"
              />
              <p className="text-xs leading-none tracking-normal text-n-500 font-normal lg:text-xl">
                {location}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
