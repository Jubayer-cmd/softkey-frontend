import { baseApi } from '../baseApi';

const category_URL = '/categories';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allcategorys: build.query({
      query: (arg) => ({
        url: `${category_URL}`,
        method: 'GET', // Use one of the allowed HTTP methods
        params: arg,
      }),
      // providesTags: [tagTypes.category],
    }),

    // get single category
    categoryId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${category_URL}/${id}`,
        method: 'GET',
      }),
      // providesTags: [tagTypes.category],
    }),
    // create a new category
    addcategory: build.mutation({
      query: (data) => ({
        url: `${category_URL}/create-category`,
        method: 'POST',
        data,
      }),
      //    providesTags: [tagTypes.category],
    }),
    // update category
    updatecategory: build.mutation({
      query: (data) => ({
        url: `${category_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      //  providesTags: [tagTypes.category],
    }),
    // delete category
    deletecategory: build.mutation({
      query: (id) => ({
        url: `${category_URL}/${id}`,
        method: 'DELETE',
      }),
      //  providesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAllcategorysQuery,
  useCategoryIdQuery,
  useAddcategoryMutation,
  useUpdatecategoryMutation,
  useDeletecategoryMutation,
} = categoryApi;
