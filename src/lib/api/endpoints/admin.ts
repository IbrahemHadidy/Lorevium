import type {
  CreateAdminRequest,
  CreateAdminResponse,
  GetAllAdminsResponse,
  GetAllUsersResponse,
} from '@/lib/types/api/admin';
import { mainApi } from '../main-api';

export const adminApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new admin user.
     * @access `Super Admin` only.
     * @param data - The fields required to create the new admin.
     * @returns The created admin's data.
     */
    createAdmin: builder.mutation<CreateAdminResponse, CreateAdminRequest>({
      query: ({ data }) => ({
        url: 'admin/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Admin', id: 'LIST' }],
    }),

    /**
     * Fetches all admin users.
     * @access `Super Admin` only.
     * @returns A list of all admins.
     */
    getAllAdmins: builder.query<GetAllAdminsResponse, void>({
      query: () => ({
        url: 'admin/all-admin',
        method: 'GET',
      }),
      providesTags: [{ type: 'Admin', id: 'LIST' }],
    }),

    /**
     * Fetches all users in the system.
     * @access `Super Admin` and `Admin`.
     * @returns A list of all users.
     */
    getAllUsers: builder.query<GetAllUsersResponse, void>({
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
