// TYPES //
import {
  TournamentFiltersData,
  AgeCategoryData,
  MatchFormatData,
  TournamentFormatData,
  GenderData,
  SlotStatusData,
  GroundTypeData,
  TournamentSeriesStatusData,
} from "@/types/tournament";

// UTILS //
import { format } from "date-fns";

export const DEFAULT_FILTERS: TournamentFiltersData = {
  city: "",
  area: "",
  format: "",
  tournament_format: "",
  age_category: "",
  gender: "",
  start_date: format(new Date(), "yyyy-MM-dd"),
  end_date: "",
};

/**
 * Tournament create enums and dropdown options
 */
export const ageCategoryOptionsData: AgeCategoryData[] = [
  "U8",
  "U10",
  "U12",
  "U14",
  "U16",
  "U18",
  "OPEN",
];

export const matchFormatOptionsData: MatchFormatData[] = [
  "5v5",
  "7v7",
  "9v9",
  "11v11",
];

export const tournamentFormatOptionsData: TournamentFormatData[] = [
  "league",
  "knockout",
  "league_knockout",
];

export const genderOptionsData: GenderData[] = ["boys", "girls", "mixed"];

export const slotStatusOptionsData: SlotStatusData[] = [
  "open",
  "filling_fast",
  "almost_full",
  "closed",
];

export const groundTypeOptionsData: GroundTypeData[] = ["turf", "mud"];

export const seriesStatusOptionsData: TournamentSeriesStatusData[] = [
  "draft",
  "published",
  "closed",
];
