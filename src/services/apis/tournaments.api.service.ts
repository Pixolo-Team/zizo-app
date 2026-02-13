// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";
import { TournamentListingItemData } from "@/types/tournament";
import { IdentityData } from "@/types/identities";

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

/** Get All Identities API Call */
export const getAllIdentitiesRequest = async (): Promise<
  ApiResponseData<IdentityData[]>
> => {
  // Set up the API Call Config
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${CONSTANTS.API_URL}/identities`,
    headers: {},
    data: {},
  };

  // Make API Call
  const response = await axios.request<ApiResponseData<IdentityData[]>>(config);
  return response.data;
};
