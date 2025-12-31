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
  onShareBtnClick: () => void;
}

export default function TournamentCardImage({
  posterUrl,
  onShareBtnClick,
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
        className="h-[219px] w-full object-cover rounded-4xl"
        loading="eager"
        onError={() => setHasError(true)}
      />

      {/* Share button */}
      <Button
        className="absolute top-5 right-5 text-n-50 bg-n-950/50 rounded-full hover:bg-n-950/70"
        variant={"default"}
        size={"icon"}
        onClick={onShareBtnClick}
      >
        {/* Share Icon */}
        <UploadBox2 primaryColor="var(--color-n-50)" className="size-4" />
      </Button>
    </>
  );
}
