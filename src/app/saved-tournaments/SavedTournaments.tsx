"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import ShareDrawer from "@/components/drawers/ShareDrawer";

// SERVICES //
// None - using context instead

// CONTEXT //
import { useSavedTournaments } from "@/context/SavedTournamentsContext";

// UTILS //
import { trackEvent } from "@/utils/analytics";

// OTHERS //

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
    trackEvent({
      action: "view_saved_tournaments",
      params: {
        count: savedTournaments.length,
      },
    });
  }, [savedTournaments.length]);

  return (
    <>
      <div>{/* Tournament Cards */}</div>

      {/* SHARE DRAWER */}
      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={selectedTournamentId}
      />
    </>
  );
}
