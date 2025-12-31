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
import AwardsSection from "@/components/tournament-details/AwardsSection";
import SponsorsSection from "@/components/tournament-details/SponsorsSection";
import OrganizerSection from "@/components/tournament-details/OrganizerSection";
import DetailsList from "@/components/tournament-details/DetailsList";
import StickyCTA from "@/components/tournament-details/StickyCTA";
import TournamentCardImage from "@/components/tournaments/TournamentCardImage";
import Motion from "@/components/animations/Motion";
import ContactBottomDrawer from "@/components/tournament-details/ContactBottomDrawer";
import TournamentInterestForm from "@/components/drawers/TournamentInterestForm";

// SERVICES //
import { getTournamentDetailsRequest } from "@/services/queries/tournaments.query";

// NAVIGATION //
import { useParams } from "next/navigation";

// OTHERS //
import { shrinkIn, fadeIn } from "@/lib/animations";
import ShareDrawer from "@/components/drawers/ShareDrawer";

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
        console.log(data);

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

  /** UseEffect */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <div className="bg-n-50 px-6 py-7 flex flex-col gap-6 rounded-b-2xl">
          {/* Main Info */}
          <div className="flex flex-col gap-5">
            {/* Tournament Hero */}
            <Motion variants={fadeIn} delay={0.3}>
              <TournamentHero
                title={tournamentDetails.series.name}
                location={`${tournamentDetails.series.ground_name}, ${tournamentDetails.series.city}`}
                price={tournamentDetails.tournament.entry_fee}
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
            <Motion variants={fadeIn} delay={0.7}>
              <AwardsSection />
            </Motion>

            {/* Sponsors Section */}
            <Motion variants={fadeIn} delay={0.8}>
              <SponsorsSection sponsors={tournamentDetails.sponsors ?? []} />
            </Motion>

            {/* Organizer Section */}
            {tournamentDetails.organizer && (
              <Motion variants={fadeIn} delay={0.9}>
                <OrganizerSection
                  id={tournamentDetails.organizer.id}
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
                  tournamentDetails.tournament.tournament_format
                }
                minMatches={`${tournamentDetails.tournament.min_matches} minimum`}
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
            onInterested={() => setIsInterestFormOpen(true)}
            onShowContact={() => setIsContactDrawerOpen(true)}
          />
        </Motion>
      </div>

      <ContactBottomDrawer
        phone={"98929222"}
        isOpen={isContactDrawerOpen}
        onOpenChange={setIsContactDrawerOpen}
      />

      <TournamentInterestForm
        isOpen={isInterestFormOpen}
        onOpenChange={setIsInterestFormOpen}
      />

      {/* SHARE DIALOG */}
      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={tournamentId}
      />
    </>
  );
}
