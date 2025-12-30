// TYPES //
import { TournamentFiltersData } from "@/types/tournament";

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
