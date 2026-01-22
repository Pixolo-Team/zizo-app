"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
import ShareDrawer from "@/components/drawers/ShareDrawer";
import TournamentCardSkeleton from "@/components/tournaments/TournamentCardSkeleton";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import SuggestedTournaments from "@/components/tournaments/SuggestedTournaments";

// SERVICES //
import { getTournamentsRequest } from "@/services/queries/tournaments.query";

// CONSTANTS //
import { DEFAULT_FILTERS } from "@/infrastructure/constants/tournaments";

// UTILS //
import { trackEvent } from "@/utils/analytics";

// OTHERS //
import { fadeIn, shrinkIn } from "@/lib/animations";
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
  const [filters, setFilters] =
    useState<TournamentFiltersData>(DEFAULT_FILTERS);
  const [isMoreFiltersDrawerOpen, setIsMoreFiltersDrawerOpen] =
    useState<boolean>(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");

  // Define Refs
  const hasFiredFilterNoResults = useRef<boolean>(false);
  const hasFiredSearchNoResults = useRef<boolean>(false);

  // Pagination States
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const PAGE_SIZE = 10;

  const debouncedSearchInput = useDebounce(searchInput, 500);

  // Helper Functions
  /** Update Filter */
  const updateFilter = (key: keyof TournamentFiltersData, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
    setHasMore(true);
  };

  /** Has Active Filters */
  const hasActiveFilters = () =>
    Object.entries(filters).some(
      ([key, value]) => key !== "city" && value !== "any"
    );

  /** Handle Right arrow click */
  const handleArrowClick = (tournamentItem: TournamentListingItemData) => {
    // If filters are active, track event
    if (hasActiveFilters()) {
      trackEvent({
        action: "filter_then_click",
        params: {
          filter_type: Object.keys(filters).find(
            (key) => filters[key as keyof TournamentFiltersData] !== "any"
          ),
          tournament_id: tournamentItem.tournament_id,
          tournament_name: tournamentItem.tournament_name,
        },
      });
    }

    trackEvent({
      action: "view_tournament_card",
      params: {
        tournament_id: tournamentItem.tournament_id,
        tournament_name: tournamentItem.tournament_name,
        city: tournamentItem.city,
        age_category: tournamentItem.age_categories.join(", "),
        gender: tournamentItem.gender,
      },
    });
    router.push(`/football-tournaments/${tournamentItem.tournament_id}`);
  };

  /** Reset Filters */
  const resetFilters = (shouldRefetch?: boolean) => {
    // Check if filters are already default
    const isAlreadyDefault =
      JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS);

    if (isAlreadyDefault && searchInput === "") {
      return;
    }

    // Reset Filters
    setFilters(DEFAULT_FILTERS);
    setSearchInput("");
    setPage(1);
    setHasMore(true);

    // Track Reset Event
    trackEvent({
      action: "clear_filter",
      params: {
        city: filters.city,
        filter_type: "all",
      },
    });

    // Refresh Data
    if (shouldRefetch) {
      setShouldRefresh((prev) => !prev);
    }
  };

  // Use Effects - Fetch Data
  useEffect(() => {
    const fetchTournaments = async () => {
      // Set loading state
      setIsTournamentsLoading(true);

      const currentFilters = filters;

      // API Call to get all tournaments
      const { data, error } = await getTournamentsRequest({
        ...currentFilters,
        area:
          currentFilters.area?.toLowerCase() === "any"
            ? ""
            : currentFilters.area?.toLowerCase() || "",
        city:
          currentFilters.city?.toLowerCase() === "any"
            ? ""
            : currentFilters.city || "",
        gender: currentFilters.gender?.toLowerCase() || "",
        tournament_format: currentFilters.tournament_format || "",
        ground_type: "",
        entry_fee_min: undefined,
        entry_fee_max: undefined,
        has_cash_prize: false,
        search_text: debouncedSearchInput,
        page: page,
        page_size: PAGE_SIZE,
      });

      // Handle Error
      if (error) {
        setIsTournamentsLoading(false);
        setHasMore(false);
        return;
      }

      const newItems = data ?? [];

      if (page === 1) {
        setTournamentItems(newItems);
      } else {
        setTournamentItems((prev) => {
          // Prevent duplicates if React Strict Mode runs effects twice
          const newIds = new Set(newItems.map((i) => i.tournament_id));
          const filteredPrev = prev.filter((p) => !newIds.has(p.tournament_id));
          return [...filteredPrev, ...newItems];
        });
      }

      setHasMore(newItems.length === PAGE_SIZE);
      setIsTournamentsLoading(false);
    };

    fetchTournaments();
  }, [page, debouncedSearchInput, filters, shouldRefresh]);

  // Use Effects - Search Event Tracking
  useEffect(() => {
    if (debouncedSearchInput.length >= 3) {
      trackEvent({
        action: "search_tournament",
        params: {
          search_query: debouncedSearchInput,
          city: filters.city,
          age_category: filters.age_category,
          event_category: "tournament_listing",
        },
      });
    }
  }, [debouncedSearchInput, filters.city, filters.age_category]);

  useEffect(() => {
    hasFiredFilterNoResults.current = false;
  }, [filters]);

  useEffect(() => {
    hasFiredSearchNoResults.current = false;
  }, [debouncedSearchInput]);

  useEffect(() => {
    if (
      !isTournamentsLoading &&
      tournamentItems.length === 0 &&
      !debouncedSearchInput &&
      !hasFiredFilterNoResults.current
    ) {
      hasFiredFilterNoResults.current = true;

      trackEvent({
        action: "filter_no_results",
        params: {
          filter_type: Object.keys(filters).find(
            (key) => filters[key as keyof TournamentFiltersData] !== "any"
          ),
          filter_value: Object.values(filters).find((v) => v !== "any"),
          city: filters.city,
        },
      });
    }
  }, [isTournamentsLoading, tournamentItems, debouncedSearchInput, filters]);

  useEffect(() => {
    if (
      !isTournamentsLoading &&
      tournamentItems.length === 0 &&
      debouncedSearchInput.length >= 3 &&
      !hasFiredSearchNoResults.current
    ) {
      hasFiredSearchNoResults.current = true;

      trackEvent({
        action: "search_no_results",
        params: {
          search_query: debouncedSearchInput,
          city: filters.city,
        },
      });
    }
  }, [
    isTournamentsLoading,
    tournamentItems,
    debouncedSearchInput,
    filters.city,
  ]);

  // Fire scroll_75 event once per page
  useEffect(() => {
    let hasFired = false;
    const initialHeight = document.documentElement.scrollHeight;

    const handleScroll = () => {
      if (hasFired) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      const progress = (scrollTop + viewportHeight) / initialHeight;

      if (progress >= 0.75) {
        hasFired = true;

        trackEvent({
          action: "scroll_75",
          params: {
            ...filters,
          },
        });

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Tournaments Listing Page */}
      {/* Page Container */}
      <div className="flex gap-15 justify-between px-5 lg:pt-10">
        <div className="flex-1 flex justify-center">
          <div className="relative xl:max-w-185 flex-1 h-full pb-7 flex flex-col gap-5 lg:gap-12 z-4">
            {/* Header Text */}
            <div className=" lg:hidden">
              <Motion variants={fadeIn} delay={0.2}>
                <p className="text-base text-n-950 font-medium font-gtwalsheim w-3/5 leading-none lg:hidden">
                  Find local football tournaments near you.
                </p>
              </Motion>
            </div>
            <div className="flex flex-col w-full gap-2.5 lg:gap-4">
              {/* Search Input */}
              <Motion as="div" variants={shrinkIn} delay={0.2}>
                <SearchInput
                  className="rounded-3xl bg-n-50"
                  value={searchInput}
                  onChange={(value) => {
                    setSearchInput(value);
                    setPage(1);
                    setHasMore(true);
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
              <div className="flex flex-col gap-5 lg:gap-6 w-full">
                {isTournamentsLoading && page === 1 ? (
                  Array.from({ length: 3 }).map(
                    (skeletonItem, skeletonIndex) => (
                      // TournamentCardSkeleton component
                      <div className="w-full" key={`skeleton-${skeletonIndex}`}>
                        <TournamentCardSkeleton />
                      </div>
                    )
                  )
                ) : (
                  <InfiniteScroll
                    hasMore={hasMore}
                    isLoading={isTournamentsLoading}
                    next={() => setPage((prev) => prev + 1)}
                    threshold={0.5}
                    className="flex flex-col gap-5 lg:gap-6 w-full"
                    loadingComponent={
                      <div className="flex flex-col gap-5 lg:gap-6 w-full">
                        <TournamentCardSkeleton />
                      </div>
                    }
                  >
                    {tournamentItems.map((tournamentItem) => (
                      // TournamentCard component
                      <TournamentCard
                        key={tournamentItem.tournament_id}
                        tournamentListingItem={tournamentItem}
                        onShareBtnClick={(
                          e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          e.stopPropagation();
                          setIsShareDialogOpen(true);
                          setSelectedTournamentId(tournamentItem.tournament_id);
                        }}
                        onRightArrowClick={() => {
                          handleArrowClick(tournamentItem);
                        }}
                      />
                    ))}
                  </InfiniteScroll>
                )}
              </div>
              {/* Bottom Text */}
              {!isTournamentsLoading && tournamentItems.length > 0 && (
                <p className="text-center text-n-600 font-normal text-sm lg:text-base mt-6">
                  We didn't think you would come this far, that is all we have.
                </p>
              )}
            </Motion>

            {/* Empty State */}
            {!isTournamentsLoading && tournamentItems.length === 0 && (
              <div className="flex flex-col  gap-3 h-full pt-16 lg:pt-0 items-center justify-center">
                {/* Empty State Image */}
                <div className="hidden dark-mode-block">
                  <Image
                    src="/images/no-tournament-dark.png"
                    alt="No tournaments (light)"
                    width={1200}
                    height={120}
                    priority
                    className="w-full h-[173px] object-cover invert-[1] lg:h-[280px] xl:h-[350px]"
                  />
                </div>

                <div className=" block dark-mode-hidden">
                  <Image
                    src="/images/no-tournament-light.png"
                    alt="No tournaments (dark)"
                    width={1200}
                    height={120}
                    priority
                    className="w-full h-[173px] object-cover lg:h-[280px] xl:h-[350px]"
                  />
                </div>

                <div className="flex flex-col gap-2 items-center">
                  {/* Empty State Title */}
                  <p className="text-center text-n-900 font-medium text-xl lg:text-2xl xl:text-3xl">
                    No tournaments on the field
                  </p>

                  {/* Empty State Subtitle */}
                  <p className="text-center text-n-600 font-normal leading-[137%] text-sm w-[78%] lg:text-lg xl:text-xl ">
                    Try changing your filters or search a different area
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SuggestedTournaments */}
        <div className="hidden xl:block xl:w-95 ">
          <SuggestedTournaments />
        </div>
      </div>

      {/* MORE FILTERS DRAWER */}
      <TournamentsFilterDrawer
        filters={filters}
        onSearch={(newFilters) => {
          setFilters(newFilters);
          setIsMoreFiltersDrawerOpen(false);
        }}
        onReset={() => {
          resetFilters(true);
          setIsMoreFiltersDrawerOpen(false);
        }}
        isOpen={isMoreFiltersDrawerOpen}
        onOpenChange={setIsMoreFiltersDrawerOpen}
      />

      <ShareDrawer
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        tournamentId={selectedTournamentId}
      />
    </>
  );
}
