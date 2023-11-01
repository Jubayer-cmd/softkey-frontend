import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { baseApi } from '../baseApi';

const user_URL = '/users';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all
    user: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: user_URL,
          method: 'GET',
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        return {
          user: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    // get single
    userId: build.query({
      query: (id: string) => ({
        url: `${user_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.user],
    }),
    userToAdmin: build.mutation({
      query: (id) => ({
        url: `${user_URL}/admin/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // update
    updateuser: build.mutation({
      query: (data) => ({
        url: `${user_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // delete
    deleteuser: build.mutation({
      query: (id) => ({
        url: `${user_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserQuery,
  useUserIdQuery,
  useDeleteuserMutation,
  useUpdateuserMutation,
  useUserToAdminMutation,
} = userApi;
