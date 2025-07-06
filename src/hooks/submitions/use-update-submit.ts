'use client';

import { useUpdateUserMutation } from '@/lib/api/endpoints/user';
import { setUser } from '@/lib/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type UpdateData } from '@/lib/validations/update-user';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useUpdateSubmit = () => {
  const t = useTranslations('RegisterAndUpdate');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (data: UpdateData) => {
    setError(null);
    if (!user?._id) {
      setError(t('updateIdError'));
      return;
    }

    try {
      const profileData = (await updateUser({ _id: user._id, data }).unwrap()).data;
      dispatch(setUser(profileData));
      toast.success(t('updateSuccess'));
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  return {
    handleUpdate,
    isLoading,
    error,
  };
};
