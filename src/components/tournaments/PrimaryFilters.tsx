"use client";

// TYPES //
import { TournamentFiltersData } from "@/types/tournament";

// ENUMS //
import { CityFilter, MatchFormatFilter } from "@/enums/tournament-filter.enum";

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
  return (
    <div className="flex justify-between items-center w-full gap-3.5">
      {/* Primary Filters */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar">
        <FilterDropdown
          title="City"
          options={Object.values(CityFilter)}
          selectedOption={filters.city || ""}
          onChange={(value) => updateFilter("city", value)}
        />
        <FilterDropdown
          title="Match Format"
          options={Object.values(MatchFormatFilter)}
          selectedOption={filters.format || ""}
          onChange={(value) => updateFilter("format", value)}
        />
      </div>

      {/* Reset Button */}
      <button
        type="button"
        className="underline text-n-950 text-xs cursor-pointer"
        onClick={resetFilters}
      >
        Reset
      </button>
    </div>
  );
}
