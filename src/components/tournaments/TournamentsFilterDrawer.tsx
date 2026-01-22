"use client";

// REACT //
import { useState, useEffect } from "react";

// TYPES //
import { TournamentFiltersData } from "@/types/tournament";

// ENUMS //
import {
  Age,
  Gender,
  MatchFormatFilter,
  TournamentFilter,
} from "@/enums/tournament-filter.enum";

// COMPONENTS //
import FilterDropdown from "@/components/ui/FilterDropdown";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";

// SERVICES //
import { getUniqueCitiesRequest } from "@/services/queries/tournaments.query";

// OTHERS //
import Motion from "../animations/Motion";
import { shrinkIn, slideInUp } from "@/lib/animations";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";

// UTILS //
import { trackEvent } from "@/utils/analytics";

interface TournamentsFilterDrawerProps {
  filters: TournamentFiltersData;
  onSearch: (filters: TournamentFiltersData) => void;
  onReset: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function TournamentsFilterDrawer({
  filters,
  onSearch,
  onReset,
  isOpen,
  onOpenChange,
}: Readonly<TournamentsFilterDrawerProps>) {
  const [localFilters, setLocalFilters] =
    useState<TournamentFiltersData>(filters);
  const [cities, setCities] = useState<string[]>([]);

  // Sync local filters with prop filters when drawer opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filters]);

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

  const updateLocalFilter = (
    key: keyof TournamentFiltersData,
    value: string
  ) => {
    setLocalFilters((prev: TournamentFiltersData) => ({
      ...prev,
      [key]: value,
    }));
  };

  /** Track Filter Application Events */
  const trackFilterEvent = (filterName: string, filterValue: string) => {
    // Add Event Tracking
    trackEvent({
      action: "apply_filter",
      params: {
        filter_type: filterName,
        filter_value: filterValue,
        city: filters.city || "any",
      },
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      {/* Drawer Content  */}
      <DrawerContent className="max-w-[700px] mx-auto">
        {/* Drawer Header */}
        <DrawerHeader
          title="Tournament Filter"
          subTitle="Select your preferences"
        />

        <div className="flex flex-col gap-7 max-h-[50vh] lg:max-h-[80vh] overflow-y-auto pb-12 lg:pb-20">
          {/* Location */}
          <Motion variants={slideInUp} delay={0.1}>
            <div className="flex flex-col gap-2 lg:gap-3">
              <p className="text-n-700 ml-2 leading-tight">City</p>
              <div className="flex flex-wrap gap-3 gap-y-2">
                {/* City */}
                <FilterDropdown
                  title="City"
                  options={cities}
                  selectedOption={localFilters.city || ""}
                  onChange={(value) => {
                    updateLocalFilter("city", value);
                    trackFilterEvent("city", value);
                  }}
                  className="border border-n-200"
                />

                {/* Area */}
                {/* <FilterDropdown
                  title="Area"
                  options={Object.values(AreaFilter)}
                  selectedOption={localFilters.area || ""}
                  onChange={(value) => updateLocalFilter("area", value)}
                  className="border border-n-200"
                /> */}
              </div>
            </div>
          </Motion>

          {/* Basic Information */}
          <Motion variants={slideInUp} delay={0.2}>
            <div className="flex flex-col gap-2 lg:gap-3">
              <p className="text-n-700 ml-2 leading-tight">Basic Information</p>
              <div className="flex flex-wrap gap-3 gap-y-2">
                <FilterDropdown
                  title="Age"
                  options={Object.values(Age)}
                  selectedOption={localFilters.age_category || ""}
                  onChange={(value) => {
                    updateLocalFilter("age_category", value);
                    trackFilterEvent("age_category", value);
                  }}
                  className="border border-n-200"
                />
                <FilterDropdown
                  title="Gender"
                  options={Object.values(Gender)}
                  selectedOption={localFilters.gender || ""}
                  onChange={(value) => {
                    updateLocalFilter("gender", value);
                    trackFilterEvent("gender", value);
                  }}
                  className="border border-n-200"
                />
              </div>
            </div>
          </Motion>

          {/* Match Details */}
          <Motion variants={slideInUp} delay={0.3}>
            <div className="flex flex-col gap-2 lg:gap-3">
              <p className="text-n-700 ml-2 leading-tight">Match Up Details</p>
              <div className="flex flex-wrap gap-3 gap-y-2">
                <FilterDropdown
                  title="Tournament Type"
                  options={Object.values(TournamentFilter)}
                  selectedOption={localFilters.tournament_format || ""}
                  onChange={(value) => {
                    updateLocalFilter("tournament_format", value);
                    trackFilterEvent("tournament_type", value);
                  }}
                  className="border border-n-200"
                />
                <FilterDropdown
                  title="Match Format"
                  options={Object.values(MatchFormatFilter)}
                  selectedOption={localFilters.format || ""}
                  onChange={(value) => {
                    updateLocalFilter("format", value);
                    trackFilterEvent("match_format", value);
                  }}
                  className="border border-n-200"
                />
              </div>
            </div>
          </Motion>

          {/* Date Range */}
          <Motion variants={slideInUp} delay={0.4}>
            <div className="flex flex-col gap-2 lg:gap-3">
              <p className="text-n-700 ml-2 leading-tight">Date Range</p>

              <div className="grid grid-cols-2 items-center">
                {/* From Date */}
                <DatePicker
                  value={localFilters.start_date}
                  onChange={(date) => {
                    updateLocalFilter("start_date", format(date, "yyyy-MM-dd"));
                    trackFilterEvent("start_date", format(date, "yyyy-MM-dd"));
                  }}
                  placeholder="From"
                  className="rounded-l-full h-11 rounded-r-none border-r-0 border-n-200 bg-n-50"
                />

                {/* To Date */}
                <DatePicker
                  value={localFilters.end_date}
                  onChange={(date) => {
                    updateLocalFilter("end_date", format(date, "yyyy-MM-dd"));
                    trackFilterEvent("end_date", format(date, "yyyy-MM-dd"));
                  }}
                  placeholder="To"
                  className="rounded-r-full h-11 rounded-l-none border-n-200 bg-n-50"
                />
              </div>
            </div>
          </Motion>
        </div>
        {/* Reset and Search Button */}
        <div className="grid grid-cols-2 gap-2 lg:gap-3 w-full fixed bottom-0 left-0 p-3 lg:p-5 lg:pb-8 bg-n-50">
          {/* Reset Button */}
          <Motion variants={shrinkIn} delay={0.6}>
            <Button
              type="button"
              onClick={onReset}
              className="bg-n-50 text-n-950 border border-n-200 h-11 w-full rounded-3xl lg:h-16 lg:text-xl lg:rounded-4xl"
              variant={"outline"}
            >
              Reset
            </Button>
          </Motion>

          {/* Search Button */}
          <Motion variants={shrinkIn} delay={0.7}>
            <Button
              type="button"
              onClick={() => onSearch(localFilters)}
              className="bg-n-950 text-n-50 h-11 w-full rounded-3xl lg:h-16 lg:text-xl lg:rounded-4xl"
            >
              Search
            </Button>
          </Motion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
