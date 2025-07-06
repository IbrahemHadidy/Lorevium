'use client';

import { useSignupMutation } from '@/lib/api/endpoints/auth';
import { Role } from '@/lib/enums/role';
import { useRouter } from '@/lib/i18n/navigation';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type RegisterData } from '@/lib/validations/register';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useRegisterSubmit = ({ reset }: { reset: () => void }) => {
  const t = useTranslations('RegisterAndUpdate');
  const router = useRouter();
  const [registerUser, { isLoading }] = useSignupMutation();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterData) => {
    setError(null);
    try {
      const profileData = (await registerUser({ data }).unwrap()).data;
      toast.success(t('registerSuccess'), {
        description: profileData.role !== Role.ADMIN && t('registerSuccessDescription'),
      });
      reset();
      router.push('/login');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  return {
    handleRegister,
    isLoading,
    error,
  };
};
