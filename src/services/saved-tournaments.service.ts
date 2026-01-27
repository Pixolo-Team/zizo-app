// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// ENUMS //
import { LocalStorageKeys } from "@/enums/app";

/**
 * Get saved tournaments from local storage
 */
export function getSavedTournamentsFromLocalStorage(): TournamentListingItemData[] {
  if (typeof window === "undefined") return [];

  try {
    const savedTournamentsJson = localStorage.getItem(
      LocalStorageKeys.SAVED_TOURNAMENTS
    );
    if (!savedTournamentsJson) return [];

    return JSON.parse(savedTournamentsJson);
  } catch (error) {
    console.error("Error reading saved tournaments from localStorage:", error);
    return [];
  }
}

/**
 * Check if a tournament is saved
 */
export function isTournamentSavedService(tournamentId: string): boolean {
  const savedTournaments = getSavedTournamentsFromLocalStorage();
  return savedTournaments.some(
    (tournament) => tournament.tournament_id === tournamentId
  );
}

/**
 * Toggle tournament save/unsave state
 */
export function toggleTournamentSaveService(
  tournament: TournamentListingItemData
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const savedTournaments = getSavedTournamentsFromLocalStorage();
    const tournamentIndex = savedTournaments.findIndex(
      (t) => t.tournament_id === tournament.tournament_id
    );

    let newSavedTournaments: TournamentListingItemData[];
    let isSaved: boolean;

    if (tournamentIndex !== -1) {
      // Tournament is already saved, remove it using splice
      newSavedTournaments = [...savedTournaments];
      newSavedTournaments.splice(tournamentIndex, 1);
      isSaved = false;
    } else {
      // Tournament is not saved, add it
      newSavedTournaments = [...savedTournaments, tournament];
      isSaved = true;
    }

    localStorage.setItem(
      LocalStorageKeys.SAVED_TOURNAMENTS,
      JSON.stringify(newSavedTournaments)
    );

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("savedTournamentsUpdated"));

    return isSaved;
  } catch (error) {
    console.error("Error toggling tournament save state:", error);
    return false;
  }
}
