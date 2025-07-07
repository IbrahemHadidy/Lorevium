'use client';

import { useCreateExamMutation, useUpdateExamMutation } from '@/lib/api/endpoints/exam';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';
import { useState } from 'react';
import { toast } from 'sonner';

export const useExamSubmit = ({
  type,
  reset,
}) => {
  const [createExam, { isLoading: isCreating }] = useCreateExamMutation();
  const [updateExam, { isLoading: isUpdating }] = useUpdateExamMutation();
  const [error, setError] = useState(null);

  const submit = async (data, _id) => {
    const successMessage = type === 'create' ? 'Exam created successfully' :'Exam updated successfully';

    setError(null);
    try {
      if (type === 'create') {
        await createExam({ data: { ...data, startDate: data.startDate } }).unwrap();
      } else {
        if (!_id) {
          toast.error('Failed to update exam, id not found');
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
