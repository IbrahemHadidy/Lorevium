'use client';

import { useGetExamByIdQuery, useUpdateExamMutation } from '@/lib/api/endpoints/exam';
import { useCreateQuestionMutation, useUpdateQuestionMutation } from '@/lib/api/endpoints/question';
import { Question } from '@/lib/types/models/question';
import { getErrorMessage } from '@/lib/utils/get-error-message';
import type { QuestionData } from '@/lib/validations/question';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export const useQuestionSubmit = ({
  type,
  reset,
  examId,
}: {
  type: 'create' | 'update';
  reset: () => void;
  examId: string;
}) => {
  const t = useTranslations('Questions');
  const [createQuestion, { isLoading: isCreating }] = useCreateQuestionMutation();
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();
  const [updateExam, { isLoading: isUpdatingExam }] = useUpdateExamMutation();
  const { data: exam, isLoading: isGetting } = useGetExamByIdQuery({ _id: examId });
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: QuestionData, _id?: string) => {
    const successMessage = type === 'create' ? t('createSuccess') : t('updateSuccess');
    setError(null);

    try {
      if (type === 'create') {
        const created = await createQuestion({ data: { ...data, exam: examId } }).unwrap();
        const createdId = created.data._id;

        console.log(exam?.data);

        await updateExam({
          _id: examId,
          data: {
            questions: [
              ...((exam?.data?.questions as Question[]).map((q) => q._id) ?? []),
              createdId,
            ],
          },
        }).unwrap();

        reset();
        toast.success(successMessage);
        return createdId;
      } else {
        if (!_id) {
          toast.error(t('updateError'));
          return;
        }
        await updateQuestion({ data: { ...data, exam: examId }, _id }).unwrap();
        reset();
        toast.success(successMessage);
        return _id;
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return {
    submit,
    isLoading: isCreating || isUpdating || isUpdatingExam || isGetting,
    error,
  };
};
