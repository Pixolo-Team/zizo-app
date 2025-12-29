export interface TournamentListingItemData {
  tournament_id: string;
  tournament_name: string;
  age_category: string;
  format: string;
  gender: string;
  tournament_format: string;
  entry_fee: number;
  cash_prize_total: number;
  slot_status: string;
  start_date: string;
  end_date: string;
  city: string;
  area: string;
  ground_type: string;
  poster_url: string;
  organizer_name: string | null;
}

// Filters
export interface TournamentFiltersData {
  city?: string;
  area?: string;
  age_category?: string;
  gender?: string;
  tournament_format?: string;
  format?: string;
  ground_type?: string;
  entry_fee_min?: number;
  entry_fee_max?: number;
  has_cash_prize?: boolean;
  start_date?: string;
  end_date?: string;
  search_text?: string;
  page?: number;
  page_size?: number;
}

export interface TournamentDetailsData {
  tournament: TournamentData;
  otherTournaments: Partial<TournamentData>[];
  series: SeriesData;
  organizer: OrganizerData | null;
  organizer_media: OrganizerMediaData[];
  organizer_testimonials: OrganizerTestimonialData[];
  sponsors: SponsorData[];
}

export interface TournamentData {
  id: string;
  series_id: string;
  age_category: string;
  format: string;
  gender: string;
  tournament_format: string;

  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;

  entry_fee: number;
  advance_fee: number;
  prizes_text: string;
  cash_prize_total: number;
  winning_prizes: string[]; // jsonb array
  awards: string[]; // jsonb array

  registration_deadline: string;
  match_days_text: string;

  min_matches: number;
  playing_team_size: number;
  total_team_size: number;
  min_players: number;
  max_players: number;

  slot_status: string;
  status: string;
  created_at: string;
}

export interface SeriesData {
  id: string;
  name: string;
  city: string;
  area: string;
  ground_name: string;
  ground_type: string;
  poster_url: string;
  status: string;
}

export interface OrganizerMediaData {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
}

export interface OrganizerTestimonialData {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
}

export interface SponsorData {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
}

export interface OrganizerData {
  id: string;
  name: string;
  type: string;
  description: string;
  logo_url: string;
}

export interface LeadData {
  identity_id: string;
  name: string;
  phone: string;
}

export interface OrganizerDetailsData {
  organizer: {
    id: string;
    name: string;
    type: "individual" | "group";
    description: string | null;
    contact_name: string | null;
    contact_phone: string | null;
    whatsapp_phone: string | null;
    logo_url: string | null;
    created_at: string;
  };

  organizer_media: {
    id: string;
    image_url: string;
    caption: string | null;
    sort_order: number;
  }[];

  organizer_testimonials: {
    id: string;
    quote: string;
    author_name: string | null;
    author_role: string | null;
  }[];

  tournament_series: {
    id: string;
    name: string;
    city: string;
    area: string | null;
    ground_name: string | null;
    ground_type: "turf" | "mud" | null;
    poster_url: string | null;
    status: "draft" | "published" | "closed";
    tournaments: {
      id: string;
      age_category: string;
      format: string;
      gender: "boys" | "girls" | "mixed";
      tournament_format: "league" | "knockout" | "league_knockout";
      entry_fee: number | null;
      cash_prize_total: number | null;
      slot_status: "open" | "filling_fast" | "almost_full" | "closed";
      start_date: string;
      end_date: string;
      status: "published" | "hidden" | "archived";
    }[];
  }[];
}

export interface TournamentContactData {
  contact_name: string;
  contact_phone: string;
}
