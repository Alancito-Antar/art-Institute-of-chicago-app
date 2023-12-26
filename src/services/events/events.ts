// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event } from "./types";
import api from "../api";
import { DataResponse, PagedDataResponse } from "../types";

// Define a service using a base URL and expected endpoints
export const eventsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getEvents: builder.query<PagedDataResponse<Event[]>, void>({
      query: () => `events`,
    }),
    getEventById: builder.query<Event, { id: number }>({
      query: ({ id }) => `events/${id}`,
      transformResponse: (r) => (r as DataResponse<Event>).data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventsQuery, useGetEventByIdQuery } = eventsApi;
