import { mainApi } from '../main-api';

export const adminApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: ({ data }) => ({
        url: 'admin/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Admin', id: 'LIST' }],
    }),
    getAllAdmins: builder.query({
      query: () => ({
        url: 'admin/all-admin',
        method: 'GET',
      }),
      providesTags: [{ type: 'Admin', id: 'LIST' }],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: 'admin/all-user',
        method: 'GET',
      }),
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useLazyGetAllAdminsQuery,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
} = adminApi;
