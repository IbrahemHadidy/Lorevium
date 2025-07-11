'use client';

import { useSubmitExamMutation } from '@/lib/api/endpoints/student-exam';
import { useRouter } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook to manage answer state and submission for a student exam session.
 * @param sessionId - The current studentExam session ID
 */
export function useStudentExamSubmit(sessionId: string) {
  const router = useRouter();
  const t = useTranslations('StudentExam');
  const [submitExam, { data: submitData, isLoading: isSubmitting }] = useSubmitExamMutation();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingTime] = useState<{ minutes: number; seconds: number } | null>(null);

  // Select answer for a question
  const handleSelect = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  // Submit current answers
  const handleSubmit = useCallback(async () => {
    if (!sessionId) return;
    const payload = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }));
    try {
      await submitExam({ _id: sessionId, data: { answers: payload } }).unwrap();
      toast.success(t('submitSuccess'));
    } catch {
      toast.error(t('submitError'));
    }
  }, [sessionId, answers, submitExam, t]);

  // Redirect on success
  useEffect(() => {
    if (submitData?.success) {
      router.push('/exams');
    }
  }, [router, submitData]);

  return { answers, handleSelect, handleSubmit, isSubmitting, remainingTime };
}
