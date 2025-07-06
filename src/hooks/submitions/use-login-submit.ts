'use client';

import { useLazyGetAllAdminsQuery } from '@/lib/api/endpoints/admin';
import { useLoginMutation } from '@/lib/api/endpoints/auth';
import { useLazyGetProfileQuery } from '@/lib/api/endpoints/user';
import { HighSchool } from '@/lib/enums/high-school';
import { Role } from '@/lib/enums/role';
import { setUser } from '@/lib/features/auth/auth.slice';
import { useRouter } from '@/lib/i18n/navigation';
import { useAppDispatch } from '@/lib/store';
import { type User } from '@/lib/types/models/user';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type LoginData } from '@/lib/validations/login';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useLoginSubmit = ({ reset }: { reset: () => void }) => {
  const t = useTranslations('Login');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();
  const [getProfile, { isLoading: isLoadingProfile }] = useLazyGetProfileQuery();
  const [getAllAdmins, { isLoading: isLoadingAdmins }] = useLazyGetAllAdminsQuery();

  const handleLogin = async (data: LoginData) => {
    setError(null);
    try {
      const loginResponse = await loginUser({ data }).unwrap();
      localStorage.setItem('token', loginResponse.token);

      let profileData: User;
      try {
        profileData = (await getProfile().unwrap()).data;
      } catch {
        await getAllAdmins().unwrap();
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

      dispatch(setUser(profileData));
      reset();
      toast.success(t('loginSuccess'));

      if (profileData.role === Role.SUPER_ADMIN) {
        router.push('/super-admin');
      } else if (profileData.role === Role.ADMIN) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  return {
    handleLogin,
    isLoading: isLoggingIn || isLoadingProfile || isLoadingAdmins,
    error,
  };
};
