import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const product_URL = '/products';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all
    products: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: product_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          products: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    // get single
    productId: build.query({
      query: (id: string) => ({
        url: `${product_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.product],
    }),
    // create
    addproduct: build.mutation({
      query: (data) => ({
        url: `${product_URL}/create-product`,
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    // update
    updateproduct: build.mutation({
      query: (data) => ({
        url: `${product_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    // delete
    deleteproduct: build.mutation({
      query: (id) => ({
        url: `${product_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductIdQuery,
  useAddproductMutation,
  useDeleteproductMutation,
  useUpdateproductMutation,
} = productApi;
