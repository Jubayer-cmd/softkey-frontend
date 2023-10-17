import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [],
    }),
    userRegistration: build.mutation({
      query: (registrationData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: registrationData,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useUserLoginMutation, useUserRegistrationMutation } = authApi;
