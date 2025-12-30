"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TYPES //
import {
  TournamentFiltersData,
  TournamentListingItemData,
} from "@/types/tournament";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import TournamentCard from "@/components/tournaments/TournamentCard";
import SearchInput from "@/components/ui/SearchInput";
import Image from "next/image";
import PrimaryFilters from "@/components/tournaments/PrimaryFilters";
import TournamentsFilterDrawer from "@/components/tournaments/TournamentsFilterDrawer";
import ShareDialog from "@/components/ShareDialog";
import TournamentCardSkeleton from "@/components/tournaments/TournamentCardSkeleton";

// SERVICES //
import { getTournamentsRequest } from "@/services/queries/tournaments.query";

// OTHERS //
import { format } from "date-fns";
import { shrinkIn } from "@/lib/animations";
import { useDebounce } from "@/hooks/useDebounce";

/** Tournaments Page */
export default function Tournaments() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define States
  const [searchInput, setSearchInput] = useState<string>("");
  const [tournamentItems, setTournamentItems] = useState<
    TournamentListingItemData[]
  >([]);
  const [isTournamentsLoading, setIsTournamentsLoading] =
    useState<boolean>(true);
  const [filters, setFilters] = useState<TournamentFiltersData>({
    city: "",
    area: "",
    format: "",
    tournament_format: "",
    age_category: "",
    gender: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: "",
  });
  const [isMoreFiltersDrawerOpen, setIsMoreFiltersDrawerOpen] =
    useState<boolean>(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");

  // Define Refs

  // Helper Functions
  /** Generate a shareable tournament link using current origin + selected tournament */
  const copyLink = origin
    ? `${origin}/football-tournaments/${selectedTournamentId}`
    : "";

  /** Function to get all tournaments */
  const getAllTournaments = async () => {
    // Set loading state
    setIsTournamentsLoading(true);

    // API Call to get all tournaments
    const { data, error } = await getTournamentsRequest({
      ...filters,
      // age_category: filters.age_category?.toLowerCase() || "",
      gender: filters.gender?.toLowerCase() || "",
      // TODO: Need to make all filters dynamic
      tournament_format:
        filters.tournament_format?.toLowerCase().replace(" ", "_") || "",
      ground_type: "",
      entry_fee_min: undefined,
      entry_fee_max: undefined,
      has_cash_prize: false,
      search_text: searchInput,
      page: 1,
      // TODO: Need to make dynamic
      page_size: 100,
    });

    // Handle Error
    if (error) {
      return error;
    }

    setTournamentItems(data ?? []);
    setIsTournamentsLoading(false);
  };

  /** Update Filter */
  const updateFilter = (key: keyof TournamentFiltersData, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /** Reset Filters */
  const resetFilters = (shouldRefetch?: boolean) => {
    // Reset Filters
    setFilters({
      city: "",
      area: "",
      format: "",
      tournament_format: "",
      age_category: "",
      gender: "",
      start_date: "",
      end_date: "",
    });

    // Refresh Data
    if (shouldRefetch) {
      setShouldRefresh((prev) => !prev);
    }
  };

  const debouncedSearchInput = useDebounce(searchInput, 500);

  // Use Effects
  useEffect(() => {
    getAllTournaments();
  }, [debouncedSearchInput, filters.city, filters.format, shouldRefresh]);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      {/* Tournaments Listing Page */}
      {/* Page Container */}
      <div className="container relative mx-auto h-full px-6 pb-7 flex flex-col gap-5 z-4">
        <div className="flex flex-col gap-2.5">
          {/* Search Input */}
          <Motion as="div" variants={shrinkIn} delay={0.2}>
            <SearchInput
              className="rounded-3xl bg-n-50"
              value={searchInput}
              onChange={(value) => {
                setSearchInput(value);
              }}
              rightIcon
              onRightIconClick={() => {
                setIsMoreFiltersDrawerOpen(true);
              }}
            />
          </Motion>

          {/* FILTER BAR */}
          <Motion as="div" variants={shrinkIn} delay={0.3}>
            <PrimaryFilters
              filters={filters}
              updateFilter={updateFilter}
              resetFilters={() => resetFilters(true)}
            />
          </Motion>
        </div>

        {/* Tournaments Listing */}
        <Motion as="div" variants={shrinkIn} delay={0.4}>
          <div className="flex flex-col gap-5">
            {isTournamentsLoading
              ? Array.from({ length: 3 }).map(
                  (skeletonItem, skeletonItemIndex) => (
                    // TournamentCardSkeleton component
                    <TournamentCardSkeleton
                      key={`skeleton-${skeletonItemIndex}`}
                    />
                  )
                )
              : tournamentItems.map((tournamentItem) => (
                  // TournamentCard component
                  <TournamentCard
                    key={tournamentItem.tournament_id}
                    tournamentListingItem={tournamentItem}
                    onShareBtnClick={() => {
                      setIsShareDialogOpen(true);
                      setSelectedTournamentId(tournamentItem.tournament_id);
                    }}
                    onRightArrowClick={() => {
                      router.push(
                        `/football-tournaments/${tournamentItem.tournament_id}`
                      );
                    }}
                  />
                ))}
          </div>
        </Motion>

        {/* Empty State */}
        {!isTournamentsLoading && tournamentItems.length === 0 && (
          <div className="flex flex-col gap-6 h-full pt-16 items-center justify-center">
            {/* Empty State Image */}
            <div className="hidden dark-mode-block">
              <Image
                src="/images/empty-tournament-darkmode.png"
                alt="No tournaments (light)"
                width={1200}
                height={120}
                priority
                className="w-[220px] h-[120px] object-contain"
              />
            </div>

            <div className=" block dark-mode-hidden">
              <Image
                src="/images/empty-tournament-lightmode.png"
                alt="No tournaments (dark)"
                width={1200}
                height={120}
                priority
                className="w-[220px] h-[120px] object-contain"
              />
            </div>

            <div className="flex flex-col gap-2.5 items-center w-[78%]">
              {/* Empty State Title */}
              <p className="text-center text-n-900 font-medium text-xl">
                No tournaments on the field
              </p>

              {/* Empty State Subtitle */}
              <p className="text-center text-n-600 font-normal text-sm">
                Try changing your filters or search a different area
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MORE FILTERS DRAWER */}
      <TournamentsFilterDrawer
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={() => resetFilters(false)}
        onSearch={() => {
          getAllTournaments();
          setIsMoreFiltersDrawerOpen(false);
        }}
        isOpen={isMoreFiltersDrawerOpen}
        onOpenChange={setIsMoreFiltersDrawerOpen}
      />

      {/* SHARE DIALOG */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        copyLink={copyLink}
      />
    </>
  );
}
