'use client';

import { useCreateLessonMutation, useUpdateLessonMutation } from '@/lib/api/endpoints/lesson';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type LessonData } from '@/lib/validations/lesson';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useLessonSubmit = ({
  type,
  reset,
}: {
  type: 'create' | 'update';
  reset: () => void;
}) => {
  const t = useTranslations('Lessons');
  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: LessonData, _id?: string) => {
    const successMessage = type === 'create' ? t('createSuccess') : t('updateSuccess');

    setError(null);
    try {
      if (type === 'create') {
        await createLesson({ data }).unwrap();
      } else {
        if (!_id) {
          toast.error(t('updateError'));
          return;
        }
        await updateLesson({
          data: {
            title: data.title,
            description: data.description,
            classLevel: data.classLevel,
            price: data.price !== 0 ? data.price : undefined,
            video: data.video,
          },
          _id,
        }).unwrap();
      }
      reset();
      toast.success(successMessage);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return {
    submit,
    isLoading: isCreating || isUpdating,
    error,
  };
};
