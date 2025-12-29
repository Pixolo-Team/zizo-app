/** Standard API Response Wrapper */
export interface ApiResponseData<T> {
  status: boolean;
  status_code: number;
  data: T;
}
