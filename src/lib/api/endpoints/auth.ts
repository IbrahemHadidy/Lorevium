import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/lib/types/api/auth';
import { mainApi } from '../main-api';

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Signs up a new user.
     * @param data - The user data to be added.
     * @returns The user data and success status.
     */
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: ({ data }) => ({
        url: 'auth/signup',
        method: 'POST',
        body: data,
      }),
    }),

    /**
     * Logs in a user.
     * @param data - The user data to be logged in.
     * @returns The token and success status.
     */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ data }) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
