// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";
import { TournamentListingItemData } from "@/types/tournament";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

/** Tournaments API Call */
export const getTournamentsRequest = async (): Promise<
  ApiResponseData<TournamentListingItemData[]>
> => {
  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${CONSTANTS.API_URL}/tournaments`,
    headers: {},
    data: {},
  };

  // Make API Call
  const response =
    await axios.request<ApiResponseData<TournamentListingItemData[]>>(config);
  return response.data;
};
