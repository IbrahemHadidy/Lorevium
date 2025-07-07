import { useLazyGetStudentScoreQuery } from '@/lib/api/endpoints/student-exam';
import { useEffect, useState } from 'react';

export function useStudentScores(exams) {
  const [scores, setScores] = useState({});
  const [getScore] = useLazyGetStudentScoreQuery();

  useEffect(() => {
    const fetchScores = async () => {
      const newScores = {};
      for (const exam of exams ?? []) {
        try {
          const score = (await getScore({ _id: exam._id }).unwrap()).data.score;
          newScores[exam._id] = score;
        } catch {
          newScores[exam._id] = 'Not submitted';
        }
      }
      setScores(newScores);
    };

    if (exams?.length) {
      fetchScores();
    }
  }, [exams, getScore]);

  return scores;
}
