"use client";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import Image from "next/image";
import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import CalendarMark from "@/components/icons/neevo-icons/CalendarMark";
import UserFullBody from "@/components/icons/neevo-icons/UserFullBody";
import CalendarUser from "@/components/icons/neevo-icons/CalendarUser";
import LineArrowRight1 from "@/components/icons/neevo-icons/LineArrowRight1";
import UploadBox2 from "@/components/icons/neevo-icons/UploadBox2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// UTILS //
import { formatLongDate } from "@/utils/date";

// Interface Props
interface TournamentCardProps {
  tournamentListingItem: TournamentListingItemData;
  onShareBtnClick: () => void;
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

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    <div className="rounded-4xl bg-n-50 overflow-hidden w-full">
      {/* Image part */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Card Image */}
        <Image
          src={
            tournamentListingItem.poster_url ??
            "/images/tournament-card-dummy.jpg"
          }
          alt="Brand Logo"
          width={200}
          height={200}
          className="h-[195px] w-full object-cover"
        />
        {/* Share button */}
        <Button
          className="absolute top-5 right-5 text-n-50 bg-n-950 rounded-full hover:bg-n-700"
          variant={"default"}
          size={"icon"}
          onClick={onShareBtnClick}
        >
          {/* Share Icon */}
          <UploadBox2 primaryColor="var(--color-n-50)" className="size-4" />
        </Button>
      </div>
      {/* Content part */}
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          {/* Title + price */}
          <div className="flex justify-between items-start">
            {/* Title + location */}
            <div className={`flex flex-col justify-start items-start`}>
              {/* Title */}
              <p className="justify-start text-n-900 text-xl font-medium leading-none">
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
                <p className="justify-start text-n-500 text-xs font-normal ">
                  {tournamentListingItem.area}
                  {","} {tournamentListingItem.city}
                </p>
              </div>
            </div>

            {/* Price */}
            <p className="justify-start text-green-500 text-lg font-bold leading-6">
              ₹{tournamentListingItem.entry_fee.toLocaleString()}
            </p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Badge component */}
            <Badge
              className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
              variant={"secondary"}
            >
              {/* Calendar Icon */}
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
              {/* Users Icon */}
              <UserFullBody className="size-4" />
              {tournamentListingItem.format}
            </Badge>

            <Badge
              className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
              variant={"secondary"}
            >
              {/* Contact Icon */}
              <CalendarUser
                className="size-4"
                primaryColor="var(--color-n-900)"
              />
              {tournamentListingItem.age_category}
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
                ₹{tournamentListingItem.cash_prize_total.toLocaleString()}
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
          >
            <LineArrowRight1 primaryColor="var(--color-n-700)" />
          </Button>
        </div>
      </div>
    </div>
  );
}
