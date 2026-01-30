"use client";

// REACT //
import React, { createContext, useContext, useEffect, useState } from "react";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// ENUMS //
import { LocalStorageKeys } from "@/enums/app";

interface SavedTournamentsContextData {
  savedTournaments: TournamentListingItemData[];
  isTournamentSaved: (tournamentId: string) => boolean;
  toggleTournamentSave: (tournament: TournamentListingItemData) => void;
  isLoading: boolean;
}

const SavedTournamentsContext = createContext<
  SavedTournamentsContextData | undefined
>(undefined);

export function SavedTournamentsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Define States
  const [savedTournaments, setSavedTournaments] = useState<
    TournamentListingItemData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper Functions
  /**
   * Load saved tournaments from localStorage
   */
  const loadSavedTournaments = React.useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const savedTournamentsJson = localStorage.getItem(
        LocalStorageKeys.SAVED_TOURNAMENTS
      );
      if (!savedTournamentsJson) {
        setSavedTournaments([]);
        return;
      }

      const tournaments = JSON.parse(savedTournamentsJson);
      setSavedTournaments(tournaments);
    } catch (error) {
      console.error(
        "Error reading saved tournaments from localStorage:",
        error
      );
      setSavedTournaments([]);
    }
  }, []);

  /**
   * Check if a tournament is saved
   */
  const isTournamentSaved = React.useCallback(
    (tournamentId: string): boolean => {
      return savedTournaments.some(
        (tournament) => tournament.tournament_id === tournamentId
      );
    },
    [savedTournaments]
  );

  /**
   * Toggle tournament save/unsave state
   */
  const toggleTournamentSave = React.useCallback(
    (tournament: TournamentListingItemData) => {
      if (typeof window === "undefined") return;

      try {
        const tournamentIndex = savedTournaments.findIndex(
          (t) => t.tournament_id === tournament.tournament_id
        );

        let newSavedTournaments: TournamentListingItemData[];

        if (tournamentIndex !== -1) {
          // Tournament is already saved, remove it
          newSavedTournaments = [...savedTournaments];
          newSavedTournaments.splice(tournamentIndex, 1);
        } else {
          // Tournament is not saved, add it
          newSavedTournaments = [...savedTournaments, tournament];
        }

        // Update state
        setSavedTournaments(newSavedTournaments);

        // Update localStorage
        localStorage.setItem(
          LocalStorageKeys.SAVED_TOURNAMENTS,
          JSON.stringify(newSavedTournaments)
        );
        window.dispatchEvent(new Event("saved-tournaments-updated"));
      } catch (error) {
        console.error("Error toggling tournament save state:", error);
      }
    },
    [savedTournaments]
  );

  // Load saved tournaments on mount
  useEffect(() => {
    loadSavedTournaments();
    setIsLoading(false);
  }, [loadSavedTournaments]);

  const value = React.useMemo(
    () => ({
      savedTournaments,
      isTournamentSaved,
      toggleTournamentSave,
      isLoading,
    }),
    [savedTournaments, isTournamentSaved, toggleTournamentSave, isLoading]
  );

  return (
    <SavedTournamentsContext.Provider value={value}>
      {children}
    </SavedTournamentsContext.Provider>
  );
}

export function useSavedTournaments() {
  const context = useContext(SavedTournamentsContext);
  if (context === undefined) {
    throw new Error(
      "useSavedTournaments must be used within a SavedTournamentsProvider"
    );
  }
  return context;
}
