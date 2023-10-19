import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

const review_URL = '/reviews';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allreviews: build.query({
      query: (arg) => ({
        url: `${review_URL}`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.review],
    }),

    // get single review
    reviewId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${review_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.review],
    }),
    // create a new review
    addreview: build.mutation({
      query: (data) => ({
        url: `${review_URL}/create-reviews`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    // update review
    updatereview: build.mutation({
      query: (data) => ({
        url: `${review_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    // delete review
    deletereview: build.mutation({
      query: (id) => ({
        url: `${review_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useAllreviewsQuery,
  useReviewIdQuery,
  useAddreviewMutation,
  useUpdatereviewMutation,
  useDeletereviewMutation,
} = reviewApi;
