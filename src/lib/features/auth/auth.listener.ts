import { adminApi } from '@/lib/api/endpoints/admin';
import { userApi } from '@/lib/api/endpoints/user';
import { HighSchool } from '@/lib/enums/high-school';
import { Role } from '@/lib/enums/role';
import type { AppDispatch, RootState } from '@/lib/store';
import { User } from '@/lib/types/models/user';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { clearUser, initializeAuth, setInitialized, setUser } from './auth.slice';

const authListener = createListenerMiddleware();
const listen = authListener.startListening.withTypes<RootState, AppDispatch>();

listen({
  actionCreator: initializeAuth,

  effect: async (_action, { dispatch }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(clearUser());
      dispatch(setInitialized());
      return;
    }

    try {
      let profileData: User | undefined;
      try {
        profileData = (
          await dispatch(
            userApi.endpoints.getProfile.initiate(undefined, { forceRefetch: true })
          ).unwrap()
        ).data;
      } catch {
        await dispatch(
          adminApi.endpoints.getAllAdmins.initiate(undefined, { forceRefetch: true })
        ).unwrap();
        profileData = {
          _id: '',
          fullName: 'Super Admin',
          email: 'S_admin@gmail.com',
          phoneNumber: '',
          role: Role.SUPER_ADMIN,
          isVerified: true,
          classLevel: HighSchool.G_1_SECONDARY,
          createdAt: '',
          updatedAt: '',
        };
      }

      if (profileData) {
        dispatch(setUser(profileData));
      } else {
        localStorage.removeItem('token');
        dispatch(clearUser());
      }
    } catch (error) {
      dispatch(clearUser());
      console.error(error);
    } finally {
      dispatch(setInitialized());
    }
  },
});

export default authListener;
