import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

const booking_URL = '/booking';

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allbookings: build.query({
      query: (arg) => ({
        url: `${booking_URL}`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.booking],
    }),

    // get single booking
    bookingId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${booking_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.booking],
    }),

    userbookingById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${booking_URL}/user/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.booking],
    }),
    // create a new booking
    addbooking: build.mutation({
      query: (data) => ({
        url: `${booking_URL}/create-booking`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // update booking
    updatebooking: build.mutation({
      query: (data) => ({
        url: `${booking_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // delete booking
    deletebooking: build.mutation({
      query: (id) => ({
        url: `${booking_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAllbookingsQuery,
 useuserbookingByIdQuery,
  useAddbookingMutation,
  useUpdatebookingMutation,
  useDeletebookingMutation,
  useBookingIdQuery,

} = bookingApi;
