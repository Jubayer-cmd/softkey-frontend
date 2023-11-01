import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const order_URL = '/orders';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all
    orders: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: order_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          orders: response,
          meta,
        };
      },
      providesTags: [tagTypes.order],
    }),
    // get single
    orderId: build.query({
      query: (id: string) => ({
        url: `${order_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.order],
    }),
    UserOrderId: build.query({
      query: (id: string) => ({
        url: `${order_URL}/user/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.order],
    }),
    // create
    addorder: build.mutation({
      query: (data) => ({
        url: `${order_URL}`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    // update
    updateorder: build.mutation({
      query: (data) => ({
        url: `${order_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    // delete
    deleteorder: build.mutation({
      query: (id) => ({
        url: `${order_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderIdQuery,
  useAddorderMutation,
  useDeleteorderMutation,
  useUpdateorderMutation,
  useUserOrderIdQuery,
} = orderApi;
