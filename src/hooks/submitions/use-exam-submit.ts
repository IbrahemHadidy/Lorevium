'use client';

import { useCreateExamMutation, useUpdateExamMutation } from '@/lib/api/endpoints/exam';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import { type ExamData } from '@/lib/validations/exam';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useExamSubmit = ({
  type,
  reset,
}: {
  type: 'create' | 'update';
  reset: () => void;
}) => {
  const t = useTranslations('Exams');
  const [createExam, { isLoading: isCreating }] = useCreateExamMutation();
  const [updateExam, { isLoading: isUpdating }] = useUpdateExamMutation();
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ExamData, _id?: string) => {
    const successMessage = type === 'create' ? t('createSuccess') : t('updateSuccess');

    setError(null);
    try {
      if (type === 'create') {
        await createExam({ data: { ...data, startDate: data.startDate } }).unwrap();
      } else {
        if (!_id) {
          toast.error(t('updateError'));
          return;
        }
        await updateExam({ data, _id }).unwrap();
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
