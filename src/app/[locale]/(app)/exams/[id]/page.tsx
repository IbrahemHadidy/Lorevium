'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useStudentExamSubmit } from '@/hooks/submitions/use-student-exam-submit';
import { useGetExamByIdQuery } from '@/lib/api/endpoints/exam';
import { useStartExamMutation } from '@/lib/api/endpoints/student-exam';
import { QuestionType } from '@/lib/enums/question-type';
import type { Question } from '@/lib/types/models/question';

export default function ExamPage() {
  const t = useTranslations('StudentExam');
  const { id: examId } = useParams<{ id: string }>();

  const [startExam, { data: startData, isLoading: isStarting }] = useStartExamMutation();
  const sessionId = startData?.data?.exam?._id ?? '';
  const { answers, handleSelect, handleSubmit, isSubmitting, remainingTime } =
    useStudentExamSubmit(sessionId);
  const { data: examDetail } = useGetExamByIdQuery({ _id: examId }, { skip: !startData });
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (examDetail?.data?.questions) {
      setQuestions(examDetail.data.questions as Question[]);
    }
  }, [examDetail]);

  // Start handler
  const handleStart = useCallback(async () => {
    if (!examId) return;
    try {
      await startExam({ _id: examId }).unwrap();
    } catch (err) {
      console.error(err);
    }
  }, [examId, startExam]);

  const formatTime = (min: number, sec: number) =>
    `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  return (
    <div className="mx-auto space-y-6 p-4 md:w-1/2">
      {/* Start screen */}
      {!startData ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('startTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleStart} disabled={isStarting} className="flex items-center">
              {isStarting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  {t('starting')}
                </>
              ) : (
                t('startButton')
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Timer */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{t('timeRemaining')}</h3>
            <span className="font-mono">
              {remainingTime?.minutes != null
                ? formatTime(remainingTime.minutes, remainingTime.seconds)
                : t('timeUp')}
            </span>
          </div>

          {/* Questions */}
          {questions.map((q) => (
            <Card key={q._id} className="border">
              <CardHeader>
                <CardTitle>{q.text}</CardTitle>
              </CardHeader>
              <CardContent>
                {q.type === QuestionType.MULTIPLE_CHOICE && (
                  <RadioGroup
                    value={answers[q._id] ?? ''}
                    onValueChange={(val) => handleSelect(q._id, val)}
                  >
                    {q.options?.map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`${q._id}-${opt}`} />
                        <label htmlFor={`${q._id}-${opt}`}>{opt}</label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {q.type === QuestionType.TRUE_FALSE && (
                  <RadioGroup
                    value={answers[q._id] ?? ''}
                    onValueChange={(val) => handleSelect(q._id, val)}
                  >
                    {['True', 'False'].map((opt) => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`${q._id}-${opt}`} />
                        <label htmlFor={`${q._id}-${opt}`}>
                          {t(opt.toLowerCase() as 'true' | 'false')}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {q.type === QuestionType.SHORT_ANSWER && (
                  <Input
                    type="text"
                    value={answers[q._id] ?? ''}
                    onChange={(e) => handleSelect(q._id, e.target.value)}
                    placeholder={t('shortAnswerPlaceholder')}
                    className="w-full"
                  />
                )}
              </CardContent>
            </Card>
          ))}

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-4 flex w-full items-center justify-center"
            variant="secondary"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              t('submitButton')
            )}
          </Button>
        </>
      )}
    </div>
  );
}
