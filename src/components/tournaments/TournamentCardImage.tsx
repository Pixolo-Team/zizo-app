"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import Image from "next/image";
import { Button } from "@/components/ui/button";

// OTHERS //
import UploadBox2 from "../icons/neevo-icons/UploadBox2";

interface TournamentCardImageProps {
  posterUrl: string | undefined | null;
  entryFee: number;
}

export default function TournamentCardImage({
  posterUrl,
  entryFee,
}: Readonly<TournamentCardImageProps>) {
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
    <>
      {/* Card Image */}
      <Image
        src={imageSrc}
        alt="Tournament Card"
        width={200}
        height={200}
        className="h-[200px] md:h-[280px] xl:h-[340px] w-full object-cover rounded-3xl"
        loading="eager"
        onError={() => setHasError(true)}
      />

      {entryFee > 0 && (
        <div className="absolute top-7 right-5 lg:top-7 lg:right-9 flex justify-center items-center text-n-800 text-sm leading-[26px]  font-semibold bg-n-50 rounded-3xl py-0.5 px-2 lg:py-3.5 lg:px-5 lg:text-xl">
          {/* Price Chip */}
          {`₹${entryFee.toLocaleString()}/-`}
        </div>
      )}
    </>
  );
}
