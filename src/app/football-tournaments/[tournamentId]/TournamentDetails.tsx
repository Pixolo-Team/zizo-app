"use client";
// REACT //
import { useEffect, useState } from "react";

// TYPES //
import { TournamentData, TournamentDetailsData } from "@/types/tournament";

// COMPONENTS //
import TournamentHero from "@/components/tournament-details/TournamentHero";
import InfoGrid from "@/components/tournament-details/InfoGrid";
import FeesSection from "@/components/tournament-details/FeesSection";
import PrizePool from "@/components/tournament-details/PrizePool";
import SponsorsSection from "@/components/tournament-details/SponsorsSection";
import OrganizerSection from "@/components/tournament-details/OrganizerSection";
import DetailsList from "@/components/tournament-details/DetailsList";
import StickyCTA from "@/components/tournament-details/StickyCTA";
import TournamentCardImage from "@/components/tournaments/TournamentCardImage";
import Motion from "@/components/animations/Motion";
import ContactBottomDrawer from "@/components/tournament-details/ContactBottomDrawer";
import TournamentInterestForm from "@/components/drawers/TournamentInterestForm";
import ShareDrawer from "@/components/drawers/ShareDrawer";

// CONSTANTS //
import { TOURNAMENT_FORMAT_LABELS } from "@/constants/labels";

// SERVICES //
import { getTournamentDetailsRequest } from "@/services/queries/tournaments.query";

// NAVIGATION //
import { useParams } from "next/navigation";

// OTHERS //
import { shrinkIn, fadeIn } from "@/lib/animations";

// ENUMS //
import { LocalStorageKeys } from "@/enums/app";
import { trackEvent } from "@/utils/analytics";
import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import { Button } from "@/components/ui/button";
import UploadBox2 from "@/components/icons/neevo-icons/UploadBox2";
import Bookmark from "@/components/icons/neevo-icons/Bookmark";
import { id } from "date-fns/locale";
import RulesAndRegulations from "@/components/tournament-details/RulesAndRegulations";
import AwardsSection from "@/components/tournament-details/AwardsSection";

// Tabs
const TABS = [
  { id: 1, label: "U-10 Boys" },
  { id: 2, label: "U-12 Boys" },
  { id: 3, label: "U-10 Girls" },
];

/** Tournament Details Page */
export default function TournamentDetails() {
  // Define Navigation
  const params = useParams();

  // Define Tournament ID
  const tournamentId = params.tournamentId as string;

  // Define States
  const [tournamentDetails, setTournamentDetails] =
    useState<TournamentDetailsData | null>(null);
  const [selectedTournament, setSelectedTournament] =
    useState<Partial<TournamentData> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] =
    useState<boolean>(false);
  const [isInterestFormOpen, setIsInterestFormOpen] = useState<boolean>(false);
  const [isContactRevealed, setIsContactRevealed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  /** Get Tournament Details */
  const getTournamentDetails = async () => {
    try {
      // Set Loading State
      setIsLoading(true);

      // Get Tournament Details
      const { data, error } = await getTournamentDetailsRequest(tournamentId);

      console.log("Tournament Details:", data);

      // Handle Error
      if (error) {
        console.error("Error getting tournament details:", error);
      } else {
        setTournamentDetails(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      // Set Loading State
      setIsLoading(false);
    }
  };

  /** UseEffect */
  useEffect(() => {
    getTournamentDetails();
  }, []);

  useEffect(() => {
    trackEvent({
      action: "view_tournament_detail",
      params: {
        tournament_id: tournamentDetails?.tournament.id,
        tournament_name: tournamentDetails?.series?.name,
        city: tournamentDetails?.series?.city,
        age_category: tournamentDetails?.tournament.age_category,
        tournament_format: tournamentDetails?.tournament.tournament_format,
        entry_fee: tournamentDetails?.tournament.entry_fee,
      },
    });
  }, [tournamentDetails]);

  /** UseEffect - Track Interest Clicks */
  useEffect(() => {
    if (isInterestFormOpen) {
      trackEvent({
        action: "click_im_interested",
        params: {
          tournament_id: tournamentDetails?.tournament.id,
          tournament_name: tournamentDetails?.series?.name,
          city: tournamentDetails?.series?.city,
        },
      });
    }
  }, [isInterestFormOpen, tournamentDetails]);

  /** UseEffect */
  useEffect(() => {
    window.scrollTo(0, 0);

    // WHY: Check if the user has already expressed interest in this tournament
    const interestedTournaments = JSON.parse(
      localStorage.getItem(LocalStorageKeys.INTERESTED_TOURNAMENTS) || "[]"
    );

    if (interestedTournaments.includes(tournamentId)) {
      setIsContactRevealed(true);
    }
  }, [tournamentId]);

  // Render Loading State
  if (isLoading) {
    return (
      <div className="h-screen pb-20 max-w-[450px] mx-auto relative flex items-center justify-center">
        <p className="text-n-500">Loading...</p>
      </div>
    );
  }

  // Render Error State
  if (!tournamentDetails || !tournamentDetails.tournament) {
    return (
      <div className="h-screen pb-20 max-w-[450px] mx-auto relative flex items-center justify-center">
        <p className="text-n-500">Tournament not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-full pb-20 pt-3 max-w-[450px] mx-auto relative z-4 flex flex-col gap-4 overflow-hidden">
        {/* Tournament Basic Details */}
        <div className="rounded-4xl bg-n-50 overflow-hidden w-full">
          {/* THumbnail Image */}
          <Motion variants={shrinkIn} delay={0.2}>
            <TournamentCardImage
              posterUrl={
                tournamentDetails.series?.poster_url ??
                "/images/default/tournament-card-thumbnail.png"
              }
              entryFee={tournamentDetails.tournament.entry_fee}
            />
          </Motion>

          <div className="pt-2.5 pb-6 lg:pt-8 lg:pb-12 lg:px-10 px-5 flex flex-col gap-3.5 lg:gap-7">
            <div className="flex flex-col gap-4 lg:gap-7">
              {/* Title + action button */}
              <div className="flex justify-between items-start">
                {/* Title + location */}
                <div
                  className={`flex flex-col justify-start items-start gap-1 lg:gap-2`}
                >
                  {/* Title */}
                  <p className="justify-start text-n-900 text-xl lg:text-3xl font-medium leading-tight">
                    {tournamentDetails.series.name}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1 lg:gap-2">
                    {/* Location Icon */}
                    <LocationPin
                      className="size-3 lg:size-6"
                      primaryColor="var(--color-n-400)"
                    />

                    {/* Location Text */}
                    <p className="justify-start text-n-500 text-xs lg:text-2xl font-normal ">
                      {tournamentDetails.series.ground_name}
                      {","} {tournamentDetails.series.city}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  {/* Share Button */}
                  <Button
                    variant={"ghost"}
                    size="icon"
                    className="size-5 lg:size-8"
                    // onClick={onShareBtnClick}
                  >
                    <UploadBox2
                      primaryColor="var(--color-n-950)"
                      className="size-5 lg:size-8"
                    />
                  </Button>

                  {/* Save Button */}
                  <Button
                    variant={"ghost"}
                    size="icon"
                    className="size-5 lg:size-8"
                  >
                    <Bookmark
                      primaryColor="var(--color-n-950)"
                      className="size-5 lg:size-8"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="pb-7 flex flex-col gap-3 rounded-b-2xl w-full">
          {/* Tabs */}
          <div className="w-full overflow-x-auto scrollbar-hide px-5">
            <div className="flex items-center gap-1.5">
              {TABS.map((tab) => (
                <div
                  key={tab.id}
                  className={`px-4 h-[38px] py-2 text-n-800 text-sm font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ${
                    tab.id === activeTab
                      ? "border-b-2 font-semibold border-n-800"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {/* Main Info */}
            <div className="flex flex-col gap-5">
              {/* Main Details */}
              <Motion variants={fadeIn} delay={0.4}>
                <InfoGrid
                  startDate={tournamentDetails.tournament.start_date}
                  startTime={tournamentDetails.tournament.start_time}
                  endDate={tournamentDetails.tournament.end_date}
                  endTime={tournamentDetails.tournament.end_time}
                  ageGroup={tournamentDetails.tournament.age_category}
                  format={tournamentDetails.tournament.format}
                  category={tournamentDetails.tournament.tournament_format}
                />
              </Motion>
            </div>

            {/* Fees and Prize Pool */}
            <div className="flex flex-col gap-1.5">
              <Motion variants={fadeIn} delay={0.5}>
                <FeesSection
                  entryFee={tournamentDetails.tournament.entry_fee}
                  advance={tournamentDetails.tournament.advance_fee}
                />
              </Motion>

              <Motion variants={fadeIn} delay={0.6}>
                <PrizePool
                  totalPool={tournamentDetails.tournament.cash_prize_total}
                  prizes={
                    tournamentDetails.tournament.winning_prizes?.map((p) =>
                      JSON.parse(p)
                    ) ?? [
                      {
                        position: "Winner",
                        amount: 10000,
                      },
                      {
                        position: "Runner Up",
                        amount: 5000,
                      },
                      {
                        position: "Third Place",
                        amount: 2500,
                      },
                    ]
                  }
                />
              </Motion>
            </div>

            {/* Bottom Information */}
            <div className="flex flex-col gap-1.5">
              {/* Awards Section */}
              <Motion variants={fadeIn} delay={0.7}>
                <AwardsSection />
              </Motion>

              {tournamentDetails.sponsors.length > 0 && (
                // Sponsors Section
                <Motion variants={fadeIn} delay={0.8}>
                  <SponsorsSection
                    sponsors={tournamentDetails.sponsors ?? []}
                  />
                </Motion>
              )}

              {/* Organizer Section */}
              {/* {tournamentDetails.organizer && (
                <Motion variants={fadeIn} delay={0.9}>
                  <OrganizerSection
                    organizerId={tournamentDetails.organizer.id}
                    name={tournamentDetails.organizer.name}
                    imageSrc={tournamentDetails.organizer.logo_url}
                  />
                </Motion>
              )} */}

              {/* Details List */}
              <Motion variants={fadeIn} delay={1}>
                <DetailsList
                  matchFormat={tournamentDetails.tournament.format}
                  tournamentFormat={
                    TOURNAMENT_FORMAT_LABELS[
                      tournamentDetails.tournament.tournament_format
                    ]
                  }
                  minMatches={tournamentDetails.tournament.min_matches}
                  fillingFast={
                    tournamentDetails.tournament.slot_status === "filling_fast"
                  }
                />
              </Motion>
            </div>
            {/* Rules and Regulations */}
            <Motion variants={fadeIn} delay={1.1}>
              <RulesAndRegulations />
            </Motion>
          </div>
        </div>

        {/* Sticky CTA */}
        <Motion variants={shrinkIn} delay={1.1}>
          <StickyCTA
            isContactRevealed={isContactRevealed}
            onRequestInterest={() => setIsInterestFormOpen(true)}
            onContactClick={() => setIsContactDrawerOpen(true)}
          />
        </Motion>
      </div>

      {/* Contact Bottom Drawer */}
      <ContactBottomDrawer
        phone={tournamentDetails.tournament?.contact_phone}
        isOpen={isContactDrawerOpen}
        onOpenChange={setIsContactDrawerOpen}
      />

      {/* Tournament Interest Form */}
      <TournamentInterestForm
        isOpen={isInterestFormOpen}
        onOpenChange={setIsInterestFormOpen}
        tournamentId={tournamentId}
        onSuccess={() => setIsContactRevealed(true)}
      />

      {/* Share Drawer */}
      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={tournamentId}
      />
    </>
  );
}
