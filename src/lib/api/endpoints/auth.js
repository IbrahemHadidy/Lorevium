import { mainApi } from '../main-api';

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ data }) => ({
        url: 'auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ data }) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
