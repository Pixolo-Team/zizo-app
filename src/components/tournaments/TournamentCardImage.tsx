"use client";

// REACT //
import { useEffect, useState } from "react";

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
}: TournamentCardImageProps) {
  const defaultImage = "/images/defaults/tournament-card-dummy.jpg";

  // Define States
  const [imageSrc, setImageSrc] = useState<string>(defaultImage);

  useEffect(() => {
    // Only set the image if posterUrl exists and is not an empty string
    if (posterUrl && posterUrl.trim() !== "") {
      setImageSrc(posterUrl);
    } else {
      setImageSrc(defaultImage);
    }
  }, [posterUrl]);

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
        onError={() => setImageSrc(defaultImage)}
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
