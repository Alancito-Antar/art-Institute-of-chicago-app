import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { noAuth?: boolean } | undefined
> = async (args, WebApi, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://api.artic.edu/api/v1/",
    prepareHeaders: (headers) => {
      return headers;
    },
  });
  return rawBaseQuery(args, WebApi, extraOptions ?? {});
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [],
  endpoints: (_builder) => ({}),
});

export default api;
