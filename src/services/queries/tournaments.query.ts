// TYPES //
import { QueryResponseData } from "@/types/query";
import {
  TournamentListingItemData,
  TournamentFiltersData,
  TournamentDetailsData,
  OrganizerDetailsData,
  LeadData,
  TournamentContactData,
} from "@/types/tournament";

// SERVICES //
import { supabase } from "@/services/supabase";

/**
 * Get a list of tournaments (with filters)
 */
export const getTournaments = async (
  filters: TournamentFiltersData
): Promise<QueryResponseData<TournamentListingItemData[]>> => {
  try {
    // Prepare the variables for the Query
    const page = filters.page || 1;
    const pageSize = filters.page_size || 10;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Prepare the Query
    let query = supabase
      .from("tournaments")
      .select(
        `
        id,
        age_category,
        format,
        gender,
        tournament_format,
        entry_fee,
        cash_prize_total,
        slot_status,
        start_date,
        end_date,

        tournament_series!inner (
          name,
          city,
          area,
          ground_type,
          poster_url,
          organizers (
            name
          )
        )
        `,
        { count: "exact" }
      )
      .eq("status", "published")
      .range(from, to);

    // Check for City
    if (filters.city) {
      query = query.eq("tournament_series.city", filters.city);
    }

    // Check for Area
    if (filters.area) {
      query = query.eq("tournament_series.area", filters.area);
    }

    // Check for Age Category
    if (filters.age_category) {
      query = query.eq("age_category", filters.age_category);
    }

    // Check for Gender
    if (filters.gender) {
      query = query.eq("gender", filters.gender);
    }

    // Check for Tournament Format
    if (filters.tournament_format) {
      query = query.eq("tournament_format", filters.tournament_format);
    }

    // Check for Format
    if (filters.format) {
      query = query.eq("format", filters.format);
    }

    // Check for Ground Type
    if (filters.ground_type) {
      query = query.eq("tournament_series.ground_type", filters.ground_type);
    }

    // Check for Entry Fee Range
    if (filters.entry_fee_min !== undefined) {
      query = query.gte("entry_fee", filters.entry_fee_min);
    }

    // Check for Entry Fee Range
    if (filters.entry_fee_max !== undefined) {
      query = query.lte("entry_fee", filters.entry_fee_max);
    }

    // Check for Has Cash Prize
    if (filters.has_cash_prize) {
      query = query.gt("cash_prize_total", 0);
    }

    // Check for Start Date
    if (filters.start_date) {
      query = query.gte("start_date", filters.start_date);
    }

    // Check for End Date
    if (filters.end_date) {
      query = query.lte("end_date", filters.end_date);
    }

    // Check for Search Text
    if (filters.search_text) {
      const search = filters.search_text.trim();

      query = query.or(`name.ilike.%${search}%`, {
        foreignTable: "tournament_series",
      });
    }

    // Execute the Query
    const { data: tournamentItems, error } = await query;

    // Check for Error
    if (error) {
      throw error;
    }

    // Mapping Database response with the required data
    const tournaments: TournamentListingItemData[] = (
      tournamentItems as any[]
    ).map((tournamentItem) => ({
      tournament_id: tournamentItem.id,

      tournament_name: tournamentItem.tournament_series?.name ?? null,
      age_category: tournamentItem.age_category,
      format: tournamentItem.format,
      gender: tournamentItem.gender,
      tournament_format: tournamentItem.tournament_format,

      entry_fee: tournamentItem.entry_fee,
      cash_prize_total: tournamentItem.cash_prize_total,
      slot_status: tournamentItem.slot_status,

      start_date: tournamentItem.start_date,
      end_date: tournamentItem.end_date,

      city: tournamentItem.tournament_series?.city ?? null,
      area: tournamentItem.tournament_series?.area ?? null,
      ground_type: tournamentItem.tournament_series?.ground_type ?? null,

      poster_url: tournamentItem.tournament_series?.poster_url ?? null,
      organizer_name:
        tournamentItem.tournament_series?.organizers?.name ?? null,
    }));

    return { data: tournaments, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get the full details about a tournament
 */
export const getTournamentDetails = async (
  tournamentId: string
): Promise<QueryResponseData<TournamentDetailsData>> => {
  try {
    const { data: tournamentFullDetails, error } = await supabase
      .from("tournaments")
      .select(
        `
        id,
        series_id,
        age_category,
        format,
        gender,
        tournament_format,
    
        start_date,
        start_time,
        end_date,
        end_time,
    
        entry_fee,
        advance_fee,
        prizes_text,
        cash_prize_total,
        winning_prizes,
        awards,
    
        registration_deadline,
        match_days_text,
    
        min_matches,
        playing_team_size,
        total_team_size,
        min_players,
        max_players,
    
        slot_status,
        status,
        created_at,
        
        tournament_series (
          id,
          name,
          city,
          area,
          ground_name,
          ground_type,
          poster_url,
          status,
          
          tournaments ( 
            id,
            age_category,
            format,
            gender,
            tournament_format,
            entry_fee,
            cash_prize_total,
            slot_status,
            start_date,
            end_date,
            status
          ),
          
          organizers (
            id,
            name,
            type,
            description,
            logo_url,
            
            organizer_media (
              id,
              image_url,
              caption,
              sort_order
            ),
            organizer_testimonials (
              id,
              quote,
              author_name,
              author_role
            )
          ),
          
          tournament_sponsor (
            sponsors (
              id,
              name,
              logo_url,
              website_url
            )
          )
        )
      `
      )
      .eq("id", tournamentId)
      .eq("status", "published")
      .single();

    if (error) {
      throw error;
    }

    // Mapping
    const tournamentData = tournamentFullDetails as any;
    const allTournamentsInSeries =
      tournamentData.tournament_series?.tournaments || [];

    // Current Tournament
    const currentTournament = tournamentData;

    // Other Tournaments (to show in Top tabs)
    const otherTournaments = allTournamentsInSeries.filter(
      (tournamentItem: any) => tournamentItem.status === "published"
    );

    // Pick the Tournament Details
    const tournamentDetails: TournamentDetailsData = {
      tournament: currentTournament,

      otherTournaments,

      series: {
        id: tournamentData.tournament_series?.id,
        name: tournamentData.tournament_series?.name,
        city: tournamentData.tournament_series?.city,
        area: tournamentData.tournament_series?.area,
        ground_name: tournamentData.tournament_series?.ground_name,
        ground_type: tournamentData.tournament_series?.ground_type,
        poster_url: tournamentData.tournament_series?.poster_url,
        status: tournamentData.tournament_series?.status,
      },

      organizer: tournamentData.tournament_series?.organizers ?? null,

      organizer_media:
        tournamentData.tournament_series?.organizers?.organizer_media ?? [],

      organizer_testimonials:
        tournamentData.tournament_series?.organizers?.organizer_testimonials ??
        [],

      sponsors:
        tournamentData.tournament_series?.tournament_sponsor?.map(
          (row: any) => row.sponsors
        ) ?? [],
    };

    return { data: tournamentDetails, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Add lead for a tournament
 */
export const addTournamentLead = async (
  tournamentId: string,
  leadData: LeadData
): Promise<QueryResponseData<boolean>> => {
  try {
    const { identity_id, name, phone } = leadData;

    // 1. Insert lead
    const { error } = await supabase
      .from("tournament_leads")
      .insert([
        {
          tournament_id: tournamentId,
          identity_id,
          name_snapshot: name,
          phone_snapshot: phone,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // 2. Log engagement
    const { error: engagementError } = await supabase
      .from("tournament_engagement")
      .insert([
        {
          tournament_id: tournamentId,
          identity_id,
          event_type: "contact_reveal",
          name_snapshot: name,
          phone_snapshot: phone,
        },
      ]);

    if (engagementError) {
      throw engagementError;
    }

    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get the contact details for a tournament
 */
export const getTournamentContactDetails = async (
  tournamentId: string
): Promise<QueryResponseData<TournamentContactData>> => {
  try {
    const { data, error } = await supabase
      .from("tournaments")
      .select(
        `
        contact_name,
        contact_phone
      `
      )
      .eq("id", tournamentId)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get the full details about a Organizer
 */
export const getOrganizerDetails = async (
  organizerId: string
): Promise<QueryResponseData<OrganizerDetailsData>> => {
  try {
    const { data, error } = await supabase
      .from("organizers")
      .select(
        `
    id,
    name,
    type,
    description,
    contact_name,
    contact_phone,
    whatsapp_phone,
    logo_url,
    created_at,

    organizer_media (
      id,
      image_url,
      caption,
      sort_order
    ),

    organizer_testimonials (
      id,
      quote,
      author_name,
      author_role
    ),

    tournament_series (
      id,
      name,
      city,
      area,
      ground_name,
      ground_type,
      poster_url,
      status,

      tournaments (
        id,
        age_category,
        format,
        gender,
        tournament_format,
        entry_fee,
        cash_prize_total,
        slot_status,
        start_date,
        end_date,
        status
      )
    )
  `
      )
      .eq("id", organizerId)
      .single();

    if (error) {
      throw error;
    }

    // Mapping
    const organizerData = data as any;
    const page_data: OrganizerDetailsData = {
      organizer: {
        id: organizerData.id,
        name: organizerData.name,
        type: organizerData.type,
        description: organizerData.description,
        contact_name: organizerData.contact_name,
        contact_phone: organizerData.contact_phone,
        whatsapp_phone: organizerData.whatsapp_phone,
        logo_url: organizerData.logo_url,
        created_at: organizerData.created_at,
      },

      organizer_media: organizerData.organizer_media ?? [],

      organizer_testimonials: organizerData.organizer_testimonials ?? [],

      tournament_series: (organizerData.tournament_series ?? []).map(
        (series: any) => ({
          id: series.id,
          name: series.name,
          city: series.city,
          area: series.area,
          ground_name: series.ground_name,
          ground_type: series.ground_type,
          poster_url: series.poster_url,
          status: series.status,
          tournaments: (series.tournaments ?? []).filter(
            (t: any) => t.status === "published"
          ),
        })
      ),
    };

    return { data: page_data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
