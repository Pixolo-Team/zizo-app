export type QueryResponseData<T> =
  | { data: T; error: null }
  | { data: null; error: Error };
