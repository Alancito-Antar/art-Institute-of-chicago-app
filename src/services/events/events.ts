import api from '../api';
import { DataResponse, PagedDataResponse, PaginationParams } from '../types';
import { Event } from './types';

export const eventsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getEvents: builder.query<PagedDataResponse<Event[]>, PaginationParams>({
      query: params => {
        const searchParams = new URLSearchParams();

        if (params?.page) {
          searchParams.set('page', params.page.toString());
        }

        if (params?.limit) {
          searchParams.set('limit', params.limit.toString());
        }

        return { url: `events?${searchParams.toString()}`, method: 'get' };
      },
    }),
    getEventById: builder.query<Event, { id: number }>({
      query: ({ id }) => `events/${id}`,
      transformResponse: r => (r as DataResponse<Event>).data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEventsQuery,
  useLazyGetEventsQuery,
  useGetEventByIdQuery,
} = eventsApi;
