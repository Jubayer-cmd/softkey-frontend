import { baseApi } from '../baseApi';

const blog_URL = '/blogs';

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allblogs: build.query({
      query: (arg) => ({
        url: `${blog_URL}`,
        method: 'GET', // Use one of the allowed HTTP methods
        params: arg,
      }),
      // providesTags: [tagTypes.blog],
    }),

    // get single blog
    blogId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${blog_URL}/${id}`,
        method: 'GET',
      }),
      // providesTags: [tagTypes.blog],
    }),
    // create a new blog
    addblog: build.mutation({
      query: (data) => ({
        url: `${blog_URL}/create-blogs`,
        method: 'POST',
        data,
      }),
      //    providesTags: [tagTypes.blog],
    }),
    // update blog
    updateblog: build.mutation({
      query: (data) => ({
        url: `${blog_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      //  providesTags: [tagTypes.blog],
    }),
    // delete blog
    deleteblog: build.mutation({
      query: (id) => ({
        url: `${blog_URL}/${id}`,
        method: 'DELETE',
      }),
      //  providesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useAllblogsQuery,
  useBlogIdQuery,
  useAddblogMutation,
  useUpdateblogMutation,
  useDeleteblogMutation,
} = blogApi;
