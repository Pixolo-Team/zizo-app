"use client";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import Image from "next/image";
import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import CalendarMark from "@/components/icons/neevo-icons/CalendarMark";
import UserFullBody from "@/components/icons/neevo-icons/UserFullBody";
import CalendarUser from "@/components/icons/neevo-icons/CalendarUser";
import UploadBox2 from "@/components/icons/neevo-icons/UploadBox2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// UTILS //
import { formatLongDate } from "@/utils/date";

// OTHERS //
import ChevronRight from "../icons/neevo-icons/ChevronRight";
import Bookmark from "../icons/neevo-icons/Bookmark";
import { useEffect, useState } from "react";

// Interface Props
interface TournamentCardProps {
  tournamentListingItem: TournamentListingItemData;
  onShareBtnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRightArrowClick: () => void;
}

export default function TournamentCard({
  tournamentListingItem,
  onShareBtnClick,
  onRightArrowClick,
}: TournamentCardProps) {
  // Define Navigation

  // Define Context

  // Define States
  const [imageSrc, setImageSrc] = useState<string>(
    "/images/default/tournament-card-thumbnail.png"
  );

  // Define Refs

  // Helper Functions

  // Use Effects
  useEffect(() => {
    if (tournamentListingItem.poster_url) {
      setImageSrc(tournamentListingItem.poster_url);
    }
  }, [tournamentListingItem]);

  return (
    <a
      className="rounded-4xl bg-n-50 overflow-hidden w-full"
      onClick={onRightArrowClick}
    >
      {/* Image part */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Card Image */}
        {imageSrc !== "" && (
          <Image
            src={imageSrc}
            onError={() =>
              setImageSrc("/images/default/tournament-card-thumbnail.png")
            }
            alt="Brand Logo"
            width={200}
            height={200}
            className="h-[200px] w-full object-cover"
            loading="eager"
          />
        )}
        {/* Share button */}
        <div className="absolute top-5 right-5 flex justify-center items-center text-n-800 text-sm leading-[26px]  font-semibold bg-n-50 rounded-3xl py-0.5 px-2">
          {/* Price Chip */}
          {`₹${tournamentListingItem.entry_fee.toLocaleString()}/-`}
        </div>
      </div>
      {/* Content part */}
      <div className="pt-2.5 pb-6 px-5 flex flex-col gap-3.5">
        <div className="flex flex-col gap-4">
          {/* Title + action button */}
          <div className="flex justify-between items-start">
            {/* Title + location */}
            <div className={`flex flex-col justify-start items-start gap-1`}>
              {/* Title */}
              <p className="justify-start text-n-900 text-xl font-medium leading-tight">
                {tournamentListingItem.tournament_name}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1">
                {/* Location Icon */}
                <LocationPin
                  className="size-3"
                  primaryColor="var(--color-n-400)"
                />

                {/* Location Text */}
                <p className="justify-start text-n-500 text-sm font-normal ">
                  {tournamentListingItem.area}
                  {","} {tournamentListingItem.city}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Share Button */}
              <Button
                variant={"ghost"}
                size="icon"
                className="size-5"
                onClick={onShareBtnClick}
              >
                <UploadBox2
                  primaryColor="var(--color-n-950)"
                  className="size-5"
                />
              </Button>

              {/* Save Button */}
              <Button variant={"ghost"} size="icon" className="size-5">
                <Bookmark
                  primaryColor="var(--color-n-950)"
                  className="size-5"
                />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Badge component */}
            <Badge
              className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
              variant={"secondary"}
            >
              {/* Start Date */}
              <CalendarMark
                className="size-4"
                primaryColor="var(--color-n-900)"
              />
              {formatLongDate(tournamentListingItem.start_date)}
            </Badge>

            <Badge
              className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
              variant={"secondary"}
            >
              {/* Format */}
              <UserFullBody
                className="size-4"
                primaryColor="var(--color-n-900)"
              />
              {tournamentListingItem.format}
            </Badge>

            <Badge
              className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
              variant={"secondary"}
            >
              {/* Age Category */}
              <CalendarUser
                className="size-4"
                primaryColor="var(--color-n-900)"
              />
              {tournamentListingItem.age_category}
            </Badge>

            <Badge
              className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
              variant={"secondary"}
            >
              {/* Slot Status */}
              <CalendarUser
                className="size-4"
                primaryColor="var(--color-n-900)"
              />
              {tournamentListingItem.slot_status.charAt(0).toUpperCase() +
                tournamentListingItem.slot_status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Winning Prizes + Right Arrow Button */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center items-start gap-1">
            <p className="justify-start text-n-500 text-xs font-normal ">
              Winning Prize
            </p>

            <div className="flex justify-start items-end gap-0.5">
              {/* Total Cash Prize */}
              <p className="text-n-900 text-xl font-bold leading-6">
                {tournamentListingItem?.cash_prize_total
                  ? `₹${tournamentListingItem.cash_prize_total?.toLocaleString()}`
                  : "Trophies"}
              </p>

              {/* Extra text */}
              <p className="text-n-500 text-xs font-normal leading-5">
                and more
              </p>
            </div>
          </div>

          {/* Right Arrow Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="View tournament details"
            onClick={onRightArrowClick}
            className="rounded-full"
          >
            <ChevronRight
              primaryColor="var(--color-n-700)"
              className="size-3.5"
            />
          </Button>
        </div>
      </div>
    </a>
  );
}
