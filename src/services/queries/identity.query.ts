// TYPES //
import { QueryResponseData } from "@/types/query";

// SERVICES //
import { supabase } from "@/services/supabase";

/**
 * Create a new identity
 */
export const createIdentity = async (): Promise<QueryResponseData<string>> => {
  try {
    const { data, error } = await supabase
      .from("identities")
      .insert([{}])
      .select("id")
      .single();

    // Check for Error
    if (error) {
      throw error;
    }

    // Mapping Database response with the required data
    const identityId = data.id;

    return { data: identityId, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
