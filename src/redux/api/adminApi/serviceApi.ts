import { baseApi } from '../baseApi';

const service_URL = '/services';

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allServices: build.query({
      query: (arg) => ({
        url: `${service_URL}`,
        method: 'GET', // Use one of the allowed HTTP methods
        params: arg,
      }),
      // providesTags: [tagTypes.service],
    }),

    // get single service
    serviceId: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${service_URL}/${id}`,
        method: 'GET',
      }),
      // providesTags: [tagTypes.service],
    }),
    // create a new service
    addservice: build.mutation({
      query: (data) => ({
        url: `${service_URL}/create-service`,
        method: 'POST',
        data,
      }),
      //    providesTags: [tagTypes.service],
    }),
    // update service
    updateservice: build.mutation({
      query: (data) => ({
        url: `${service_URL}/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      //  providesTags: [tagTypes.service],
    }),
    // delete service
    deleteservice: build.mutation({
      query: (id) => ({
        url: `${service_URL}/${id}`,
        method: 'DELETE',
      }),
      //  providesTags: [tagTypes.service],
    }),
  }),
});

export const {
 useAllServicesQuery,
  useServiceIdQuery,
  useAddserviceMutation,
  useUpdateserviceMutation,
  useDeleteserviceMutation,
} = serviceApi;
