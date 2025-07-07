'use client';

import { useForgotPasswordMutation } from '@/lib/api/endpoints/user';
import { useRouter } from '@/lib/i18n/navigation';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type ForgotPasswordData } from '@/lib/validations/forgot-password';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useForgotPasswordSubmit = ({ reset }: { reset: () => void }) => {
  const t = useTranslations('ForgotPassword');
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    setError(null);
    try {
      await forgotPassword({ data }).unwrap();
      toast.success(t('emailSent'), {
        description: t('emailSentDescription'),
      });
      reset();
      router.push('/reset-password');
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  return {
    handleForgotPassword,
    isLoading,
    error,
  };
};
