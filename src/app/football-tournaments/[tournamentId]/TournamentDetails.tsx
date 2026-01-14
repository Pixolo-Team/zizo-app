"use client";
// REACT //
import { useEffect, useState } from "react";

// TYPES //
import { TournamentDetailsData } from "@/types/tournament";

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

/** Tournament Details Page */
export default function TournamentDetails() {
  // Define Navigation
  const params = useParams();

  // Define Tournament ID
  const tournamentId = params.tournamentId as string;

  // Define States
  const [tournamentDetails, setTournamentDetails] =
    useState<TournamentDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] =
    useState<boolean>(false);
  const [isInterestFormOpen, setIsInterestFormOpen] = useState<boolean>(false);
  const [isContactRevealed, setIsContactRevealed] = useState<boolean>(false);

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
      <div className="h-full pb-20 max-w-[450px] mx-auto relative z-4">
        {/* THumbnail Image */}
        <Motion variants={shrinkIn} delay={0.2}>
          <TournamentCardImage
            posterUrl={
              tournamentDetails.series?.poster_url ??
              "/images/default/tournament-card-thumbnail.png"
            }
            onShareBtnClick={() => setIsShareDialogOpen(true)}
          />
        </Motion>

        {/* Details Section */}
        <div className="px-6 py-7 flex flex-col gap-6 rounded-b-2xl">
          {/* Main Info */}
          <div className="flex flex-col gap-5">
            {/* Tournament Hero */}
            <Motion variants={fadeIn} delay={0.3}>
              <TournamentHero
                title={tournamentDetails.series.name}
                location={`${tournamentDetails.series.ground_name}, ${tournamentDetails.series.city}`}
                entryFee={tournamentDetails.tournament.entry_fee}
              />
            </Motion>

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
          <div className="flex flex-col gap-2">
            <Motion variants={fadeIn} delay={0.5}>
              <FeesSection
                entryFee={tournamentDetails.tournament.entry_fee}
                advance={tournamentDetails.tournament.advance_fee}
              />
            </Motion>

            {tournamentDetails.tournament.cash_prize_total > 0 && (
              <Motion variants={fadeIn} delay={0.6}>
                <PrizePool
                  totalPool={tournamentDetails.tournament.cash_prize_total}
                  prizes={
                    tournamentDetails.tournament.winning_prizes?.map((p) =>
                      JSON.parse(p)
                    ) ?? []
                  }
                />
              </Motion>
            )}
          </div>

          {/* Bottom Information */}
          <div className="flex flex-col gap-10">
            {/* Awards Section */}
            {/* <Motion variants={fadeIn} delay={0.7}>
              <AwardsSection />
            </Motion> */}

            {tournamentDetails.sponsors.length > 0 && (
              // Sponsors Section
              <Motion variants={fadeIn} delay={0.8}>
                <SponsorsSection sponsors={tournamentDetails.sponsors ?? []} />
              </Motion>
            )}

            {/* Organizer Section */}
            {tournamentDetails.organizer && (
              <Motion variants={fadeIn} delay={0.9}>
                <OrganizerSection
                  organizerId={tournamentDetails.organizer.id}
                  name={tournamentDetails.organizer.name}
                  imageSrc={tournamentDetails.organizer.logo_url}
                />
              </Motion>
            )}

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
