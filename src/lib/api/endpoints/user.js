import { mainApi } from '../main-api';

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.data._id || 'me' }] : [{ type: 'User', id: 'me' }],
    }),
    updateUser: builder.mutation({
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
    deleteUser: builder.mutation({
      query: () => ({
        url: `user`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'User', id: 'me' },
        { type: 'User', id: 'LIST' },
      ],
    }),
    forgotPassword: builder.mutation({
      query: ({ data }) => ({
        url: 'user/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
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
