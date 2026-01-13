"use client";
// REACT //
import { useState, useEffect } from "react";

// TYPES //
import { TournamentFiltersData } from "@/types/tournament";

// ENUMS //
import { MatchFormatFilter } from "@/enums/tournament-filter.enum";

// SERVICES //
import { getUniqueCitiesRequest } from "@/services/queries/tournaments.query";

// COMPONENTS //
import FilterDropdown from "@/components/ui/FilterDropdown";

interface PrimaryFiltersProps {
  filters: TournamentFiltersData;
  updateFilter: (key: keyof TournamentFiltersData, value: string) => void;
  resetFilters: () => void;
}

export default function PrimaryFilters({
  filters,
  updateFilter,
  resetFilters,
}: PrimaryFiltersProps) {
  const [cities, setCities] = useState<string[]>([]);

  /** Fetch unique cities */
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data, error } = await getUniqueCitiesRequest();

        if (error) {
          console.error("Error fetching cities:", error);
        } else {
          setCities(data || []);
        }
      } catch (err) {
        console.error("Error in fetchCities:", err);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="flex justify-between items-center w-full gap-3.5">
      {/* Primary Filters */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar">
        {/* City Filter */}
        <FilterDropdown
          title="City"
          options={cities}
          selectedOption={filters.city || ""}
          onChange={(value) => updateFilter("city", value)}
        />

        {/* Match Format Filter */}
        <FilterDropdown
          title="Match Format"
          options={Object.values(MatchFormatFilter)}
          selectedOption={filters.format || ""}
          onChange={(value) => updateFilter("format", value)}
        />
      </div>

      {/* Clear Button */}
      <button
        type="button"
        className="py-2 px-2.5 bg-n-50 rounded-[20px] flex items-center justify-center text-n-950 text-xs cursor-pointer"
        onClick={resetFilters}
      >
        Clear
      </button>
    </div>
  );
}
