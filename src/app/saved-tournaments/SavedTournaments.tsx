"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import ShareDrawer from "@/components/drawers/ShareDrawer";
import SuggestedTournaments from "@/components/tournaments/SuggestedTournaments";
import TournamentCard from "@/components/tournaments/TournamentCard";
import Image from "next/image";

// UTILS //
import { trackEvent } from "@/utils/analytics";

// OTHERS //
import { useSavedTournaments } from "@/context/SavedTournamentsContext";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

// None - using context instead

/** Saved Tournaments Page */
export default function SavedTournaments() {
  // Define Navigation
  const router = useRouter();

  // Define Context
  // Saved Tournaments Data
  const { savedTournaments } = useSavedTournaments();

  // Define States
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");

  // Helper Functions
  /**
   * Handle Right arrow click
   */
  const handleArrowClick = (tournamentItem: TournamentListingItemData) => {
    trackEvent({
      action: "saved_tournament_click",
      params: {
        tournament_id: tournamentItem.tournament_id,
        tournament_name: tournamentItem.tournament_name,
      },
    });

    router.push(`/football-tournaments/${tournamentItem.tournament_id}`);
  };

  // Use Effects
  useEffect(() => {
    trackEvent({
      action: "view_saved_tournaments",
      params: {
        count: savedTournaments.length,
      },
    });
  }, [savedTournaments.length]);

  return (
    <>
      <div className="flex flex-col justify-center gap-6 bg-n-100 px-5 lg:flex-row lg:pt-10 lg:gap-24 ">
        {/* Header */}
        <div className="lg:hidden pt-6 pb-3">
          <PageHeader
            showBackButton={true}
            showZizoLogo={false}
            text="Saved Tournaments"
          />
        </div>

        {/* Tournaments Listing */}
        <div className="flex flex-col gap-4">
          {savedTournaments.map((tournamentItem) => (
            <TournamentCard
              key={tournamentItem.tournament_id}
              tournamentListingItem={tournamentItem}
              onShareBtnClick={(e) => {
                e.stopPropagation();
                setIsShareDialogOpen(true);
                setSelectedTournamentId(tournamentItem.tournament_id);
              }}
              onRightArrowClick={() => handleArrowClick(tournamentItem)}
            />
          ))}
        </div>

        {/* Empty State */}
        {savedTournaments.length === 0 && (
          <div className="flex flex-col gap-6 lg:gap-12">
            <div className="flex flex-col gap-3 h-full lg:pt-0 items-center justify-center">
              {/* Empty State Image */}
              <div className="hidden dark-mode-block">
                <Image
                  src="/images/no-saved-tournament-dark-mode.png"
                  alt="No saved tournaments"
                  width={800}
                  height={400}
                  priority
                  className="w-full h-[173px] object-cover  lg:h-[280px] xl:h-[350px]"
                />
              </div>
              <div className=" block dark-mode-hidden">
                <Image
                  src="/images/no-saved-tournament-light-mode.png"
                  alt="No saved tournaments"
                  width={800}
                  height={400}
                  priority
                  className="w-full h-[173px] object-cover  lg:h-[280px] xl:h-[350px]"
                />
              </div>

              <div className="flex flex-col gap-2 items-center">
                {/* Empty State Title */}
                <p className="text-center text-n-900 font-medium text-xl lg:text-2xl xl:text-3xl">
                  Nothing is saved yet
                </p>

                {/* Empty State Subtitle */}
                <p className="text-center text-n-600 font-normal leading-[137%] text-sm w-[78%] lg:text-lg xl:text-xl ">
                  Save tournaments you’re interested in and find them here
                  anytime
                </p>
              </div>
            </div>
            <Button
              aria-label="Explore more"
              className={`rounded-[30px] bg-n-900 text-n-50 py-5 px-6 self-center`}
              variant="secondary"
              onClick={() => router.push("/football-tournaments")}
            >
              Explore tournaments
            </Button>
          </div>
        )}
        {/* SuggestedTournaments */}
        <div className="hidden xl:block xl:w-95 ">
          <SuggestedTournaments />
        </div>
      </div>
      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={selectedTournamentId}
      />
    </>
  );
}
