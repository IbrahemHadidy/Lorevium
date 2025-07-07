'use client';

import { useResetPasswordMutation } from '@/lib/api/endpoints/user';
import { useRouter } from '@/lib/i18n/navigation';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type ResetPasswordData } from '@/lib/validations/reset-passoword';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useResetPasswordSubmit = ({ reset }: { reset: () => void }) => {
  const t = useTranslations('ResetPassword');
  const router = useRouter();
  const [resetPassoword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (data: ResetPasswordData) => {
    setError(null);
    try {
      await resetPassoword({ data }).unwrap();
      toast.success(t('resetPassowordSuccess'), {
        description: t('resetPassowordSuccessDescription'),
      });
      reset();
      router.push('/login');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  return {
    handleResetPassword,
    isLoading,
    error,
  };
};
