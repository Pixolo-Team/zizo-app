"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import TournamentCard from "@/components/tournaments/TournamentCard";
import Image from "next/image";
import ShareDrawer from "@/components/drawers/ShareDrawer";

// SERVICES //
import { getSavedTournamentsFromLocalStorage } from "@/services/saved-tournaments.service";

// UTILS //
import { trackEvent } from "@/utils/analytics";

// OTHERS //
import { fadeIn } from "@/lib/animations";

/** Saved Tournaments Page */
export default function SavedTournaments() {
  // Define Navigation
  const router = useRouter();

  // Define States
  const [savedTournaments, setSavedTournaments] = useState<
    TournamentListingItemData[]
  >([]);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");

  // Helper Functions
  /**
   * Load saved tournaments from localStorage
   */
  const loadSavedTournaments = () => {
    const tournaments = getSavedTournamentsFromLocalStorage();
    setSavedTournaments(tournaments);
  };

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

  /**
   * Handle Share button click
   */
  const handleShareBtnClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    tournamentItem: TournamentListingItemData
  ) => {
    event.stopPropagation();
    setSelectedTournamentId(tournamentItem.tournament_id);
    setIsShareDialogOpen(true);

    trackEvent({
      action: "share_tournament",
      params: {
        tournament_id: tournamentItem.tournament_id,
        tournament_name: tournamentItem.tournament_name,
        source: "saved_tournaments",
      },
    });
  };

  // Use Effects
  useEffect(() => {
    loadSavedTournaments();

    // Listen for storage events to update when tournaments are saved/unsaved
    const handleStorageChange = () => {
      loadSavedTournaments();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for same-page updates
    const handleCustomUpdate = () => {
      loadSavedTournaments();
    };
    
    window.addEventListener("savedTournamentsUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("savedTournamentsUpdated", handleCustomUpdate);
    };
  }, []);

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
      <div className="h-full pb-20 pt-7 px-5 max-w-[450px] mx-auto relative z-4">
        {/* Page Title */}
        <Motion variants={fadeIn} delay={0.1}>
          <h1 className="text-n-900 text-2xl lg:text-3xl font-semibold mb-6">
            Saved Tournaments
          </h1>
        </Motion>

        {/* Tournament Cards */}
        <div className="flex flex-col gap-5 lg:gap-10">
          {savedTournaments.length > 0 ? (
            savedTournaments.map((tournamentItem, index) => (
              <Motion key={tournamentItem.tournament_id} variants={fadeIn} delay={0.2 + index * 0.1}>
                <TournamentCard
                  tournamentListingItem={tournamentItem}
                  onShareBtnClick={(event) =>
                    handleShareBtnClick(event, tournamentItem)
                  }
                  onRightArrowClick={() => handleArrowClick(tournamentItem)}
                />
              </Motion>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col gap-3 h-full pt-16 lg:pt-0 items-center justify-center">
              {/* Empty State Image */}
              <div className="hidden dark-mode-block">
                <Image
                  src="/images/no-tournament-dark.png"
                  alt="No saved tournaments (dark)"
                  width={1200}
                  height={120}
                  priority
                  className="w-full h-[173px] object-cover invert-[1] lg:h-[280px] xl:h-[350px]"
                />
              </div>

              <div className="block dark-mode-hidden">
                <Image
                  src="/images/no-tournament-light.png"
                  alt="No saved tournaments (light)"
                  width={1200}
                  height={120}
                  priority
                  className="w-full h-[173px] object-cover lg:h-[280px] xl:h-[350px]"
                />
              </div>

              <div className="flex flex-col gap-2 items-center">
                {/* Empty State Title */}
                <p className="text-center text-n-900 font-medium text-xl lg:text-2xl xl:text-3xl">
                  No saved tournaments yet
                </p>

                {/* Empty State Subtitle */}
                <p className="text-center text-n-600 font-normal leading-[137%] text-sm w-[78%] lg:text-lg xl:text-xl">
                  Start saving tournaments to see them here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SHARE DRAWER */}
      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={selectedTournamentId}
      />
    </>
  );
}
