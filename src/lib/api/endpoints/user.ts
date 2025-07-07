import type {
  DeleteUserResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetProfileResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@/lib/types/api/user';
import { mainApi } from '../main-api';

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Fetches the authenticated user's profile.
     * @returns The user's profile information.
     */
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.data._id || 'me' }] : [{ type: 'User', id: 'me' }],
    }),

    /**
     * Updates a user's information.
     * @param _id - The ID of the user to update.
     * @param data - The fields to update in the user.
     * @returns The updated user data.
     */
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ _id, data }) => ({
        url: `user/${_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: 'User', id: _id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    /**
     * Deletes the currently authenticated user.
     * @returns A response confirming the user deletion.
     */
    deleteUser: builder.mutation<DeleteUserResponse, void>({
      query: () => ({
        url: `user`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'User', id: 'me' },
        { type: 'User', id: 'LIST' },
      ],
    }),

    /**
     * Sends a password reset email to the user.
     * @param data - The email address of the user requesting the password reset.
     * @returns A response indicating success or failure of the request.
     */
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: ({ data }) => ({
        url: 'user/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    /**
     * Resets a user's password.
     * @param data - The new password and reset token.
     * @returns A response indicating success or failure of the request.
     */
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: ({ data }) => ({
        url: 'user/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;
