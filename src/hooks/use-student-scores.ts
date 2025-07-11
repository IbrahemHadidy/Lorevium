import { useLazyGetStudentScoreQuery } from '@/lib/api/endpoints/student-exam';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function useStudentScores(exams: { _id: string }[] | undefined) {
  const [scores, setScores] = useState<Record<string, string | number>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<string, boolean>>({});
  const [getScore] = useLazyGetStudentScoreQuery();
  const t = useTranslations('Exams');

  useEffect(() => {
    const fetchScores = async () => {
      const newScores: Record<string, string | number> = {};
      for (const exam of exams ?? []) {
        try {
          const score = (await getScore({ _id: exam._id }).unwrap()).data.score;
          newScores[exam._id] = score;
          setIsSubmitted((prev) => ({ ...prev, [exam._id]: true }));
        } catch {
          newScores[exam._id] = t('notSubmitted');
          setIsSubmitted((prev) => ({ ...prev, [exam._id]: false }));
        }
      }
      setScores(newScores);
    };

    if (exams?.length) {
      fetchScores();
    }
  }, [exams, getScore, t]);

  return { scores, isSubmitted };
}
