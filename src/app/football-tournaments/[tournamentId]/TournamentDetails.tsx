"use client";
// REACT //
import { useEffect, useState } from "react";

// TYPES //
import {
  TournamentData,
  TournamentDetailsData,
  TournamentListingItemData,
  SeriesData,
} from "@/types/tournament";

// COMPONENTS //
import InfoGrid from "@/components/tournament-details/InfoGrid";
import FeesSection from "@/components/tournament-details/FeesSection";
import PrizePool from "@/components/tournament-details/PrizePool";
import SponsorsSection from "@/components/tournament-details/SponsorsSection";
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

// CONTEXT //
import { useSavedTournaments } from "@/context/SavedTournamentsContext";

import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import { Button } from "@/components/ui/button";
import UploadBox2 from "@/components/icons/neevo-icons/UploadBox2";
import Bookmark from "@/components/icons/neevo-icons/Bookmark";
import RulesAndRegulations from "@/components/tournament-details/RulesAndRegulations";
import AwardsSection from "@/components/tournament-details/AwardsSection";
import SuggestedTournaments from "@/components/tournaments/SuggestedTournaments";

/** Tournament Details Page */
export default function TournamentDetails() {
  // Define Navigation
  const params = useParams();

  // Define Tournament ID
  const tournamentId = params.tournamentId as string;

  // Define Context
  const { isTournamentSaved, toggleTournamentSave } = useSavedTournaments();

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

  // Active tab should be selected tournament id
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Helper Functions
  /**
   * Convert tournament details to listing item data for saving
   */
  const convertToListingItem = (
    tournament: Partial<TournamentData>,
    series: SeriesData,
    organizerName: string | null
  ): TournamentListingItemData => {
    return {
      tournament_id: tournament.id || "",
      tournament_name: series.name,
      age_categories: tournament.age_category ? [tournament.age_category] : [],
      format: tournament.format || "",
      gender: tournament.gender || "",
      tournament_format: tournament.tournament_format || "",
      entry_fee: tournament.entry_fee || 0,
      cash_prize_total: tournament.cash_prize_total || 0,
      slot_status: tournament.slot_status || "",
      start_date: tournament.start_date || "",
      end_date: tournament.end_date || "",
      city: series.city,
      area: series.area,
      ground_type: series.ground_type,
      poster_url: series.poster_url,
      organizer_name: organizerName,
    };
  };

  /**
   * Handle save/unsave button click
   */
  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!tournamentDetails || !selectedTournament) return;

    const listingItem = convertToListingItem(
      selectedTournament,
      tournamentDetails.series,
      tournamentDetails.organizer?.name || null
    );
    toggleTournamentSave(listingItem);
  };

  /** Get Tournament Details */
  const getTournamentDetails = async () => {
    try {
      // Set Loading State
      setIsLoading(true);

      // Get Tournament Details
      const { data, error } = await getTournamentDetailsRequest(tournamentId);

      // Handle Error
      if (error) {
        console.error("Error getting tournament details:", error);
      } else {
        setTournamentDetails(data);

        // Set active tab for the first time when data comes
        setActiveTab((prev) => prev ?? data?.tournament?.id ?? null);
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

  // Selected tournament should come from active tab (otherTournaments)
  useEffect(() => {
    if (!tournamentDetails) return;

    const selected =
      tournamentDetails.otherTournaments?.find((t) => t.id === activeTab) ??
      tournamentDetails.tournament;

    setSelectedTournament(selected);
  }, [activeTab, tournamentDetails]);

  useEffect(() => {
    trackEvent({
      action: "view_tournament_detail",
      params: {
        tournament_id: selectedTournament?.id,
        tournament_name: tournamentDetails?.series?.name,
        city: tournamentDetails?.series?.city,
        age_category: selectedTournament?.age_category,
        tournament_format: selectedTournament?.tournament_format,
        entry_fee: selectedTournament?.entry_fee,
      },
    });
  }, [tournamentDetails, selectedTournament]);

  /** UseEffect - Track Interest Clicks */
  useEffect(() => {
    if (isInterestFormOpen) {
      trackEvent({
        action: "click_im_interested",
        params: {
          tournament_id: selectedTournament?.id,
          tournament_name: tournamentDetails?.series?.name,
          city: tournamentDetails?.series?.city,
        },
      });
    }
  }, [isInterestFormOpen, tournamentDetails, selectedTournament]);

  /** UseEffect */
  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if the user has already expressed interest in this tournament
    const interestedTournaments = JSON.parse(
      localStorage.getItem(LocalStorageKeys.INTERESTED_TOURNAMENTS) || "[]"
    );

    // if user came from direct link, we check interest status for current route tournamentId
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

  // Selected tournament from tabs
  const tabTournament =
    tournamentDetails.otherTournaments?.find((t) => t.id === activeTab) ?? null;

  // Some fields like phone/prizes might not exist inside otherTournaments,
  // so we fallback to main tournament
  const tournament = {
    ...tournamentDetails.tournament,
    ...(tabTournament ?? {}),
  };

  return (
    <>
      <div className="flex gap-15 px-5 lg:pt-10 ">
        <div className="flex-1 flex justify-center">
          <div className="h-full pb-20 pt-3 xl:max-w-190 flex-1 mx-auto relative z-4 flex flex-col gap-4 overflow-hidden">
            {/* Tournament Basic Details */}
            <div className="rounded-4xl bg-n-50 overflow-hidden w-full">
              {/* THumbnail Image */}
              <Motion variants={shrinkIn} delay={0.2}>
                <TournamentCardImage
                  posterUrl={
                    tournamentDetails.series?.poster_url ??
                    "/images/default/tournament-card-thumbnail.png"
                  }
                  entryFee={tournament.entry_fee}
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
                        onClick={() => setIsShareDialogOpen(true)}
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
                        onClick={handleSaveClick}
                      >
                        <Bookmark
                          primaryColor={
                            selectedTournament?.id &&
                            isTournamentSaved(selectedTournament.id)
                              ? "var(--color-red-500)"
                              : "var(--color-n-950)"
                          }
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
                  {tournamentDetails.otherTournaments?.map((t) => {
                    const label = `${t.age_category} ${
                      t.gender
                        ? t.gender.charAt(0).toUpperCase() + t.gender.slice(1)
                        : ""
                    }`;

                    return (
                      <div
                        key={t.id}
                        className={`px-4 lg:px-5 h-[38px] lg:h-[41px] py-2 text-n-800 text-sm lg:text-lg font-medium whitespace-nowrap cursor-pointer
    border-b-2 transition-colors duration-300 ease-in-out
    ${t.id === activeTab ? "border-n-800" : "border-transparent"}
  `}
                        onClick={() => setActiveTab(t.id || "")}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {/* Main Info */}
                <div className="flex flex-col gap-5">
                  {/* Main Details */}
                  <Motion variants={fadeIn} delay={0.4}>
                    <InfoGrid
                      startDate={tournament.start_date}
                      startTime={tournament.start_time}
                      endDate={tournament.end_date}
                      endTime={tournament.end_time}
                      ageGroup={tournament.age_category}
                      format={tournament.format}
                      category={tournament.tournament_format}
                    />
                  </Motion>
                </div>

                {/* Fees and Prize Pool */}
                <div className="flex flex-col gap-1.5">
                  <Motion variants={fadeIn} delay={0.5}>
                    <FeesSection
                      entryFee={tournament.entry_fee}
                      advance={tournament.advance_fee}
                    />
                  </Motion>

                  {tournament.cash_prize_total > 0 && (
                    <Motion variants={fadeIn} delay={0.6}>
                      <PrizePool
                        totalPool={tournament.cash_prize_total || 0}
                        prizes={
                          tournament.winning_prizes?.map((p) =>
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
                  )}
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
                      matchFormat={tournament.format}
                      tournamentFormat={
                        TOURNAMENT_FORMAT_LABELS[
                          tournament.tournament_format as keyof typeof TOURNAMENT_FORMAT_LABELS
                        ]
                      }
                      minMatches={tournament.min_matches}
                      fillingFast={tournament.slot_status === "filling_fast"}
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
                onShareBtnClick={() => setIsShareDialogOpen(true)}
              />
            </Motion>
          </div>
        </div>

        {/* SuggestedTournaments */}
        <div className="hidden xl:block xl:w-95">
          <SuggestedTournaments />
        </div>
      </div>

      {/* Contact Bottom Drawer */}
      <ContactBottomDrawer
        phone={tournament.contact_phone}
        isOpen={isContactDrawerOpen}
        onOpenChange={setIsContactDrawerOpen}
      />

      {/* Tournament Interest Form */}
      <TournamentInterestForm
        isOpen={isInterestFormOpen}
        onOpenChange={setIsInterestFormOpen}
        tournamentId={tournament.id}
        onSuccess={() => setIsContactRevealed(true)}
      />

      {/* Share Drawer */}
      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={tournament.id}
      />
    </>
  );
}
