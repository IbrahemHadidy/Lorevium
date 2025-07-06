import { QuestionType } from '@/lib/enums/question-type';
import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'Questions'>>;

export const createQuestionSchema = (t: Translations) => {
  return z
    .object({
      text: z
        .string()
        .trim()
        .min(3, { message: t('Errors.titleLength', { min: 3 }) })
        .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
      type: z.nativeEnum(QuestionType, {
        required_error: t('Errors.questionTypeRequired'),
        invalid_type_error: t('Errors.invalidQuestionType'),
      }),
      options: z.array(z.string()).min(2, { message: t('Errors.optionsLength') }),
      correctAnswer: z.string(),
      exam: z.string(),
      points: z.coerce
        .number()
        .min(1, { message: t('Errors.pointsMin', { min: 1 }) })
        .max(100, { message: t('Errors.pointsMax', { max: 100 }) }),
    })
    .refine((data) => data.options.includes(data.correctAnswer), {
      message: t('Errors.correctAnswerNotInOptions'),
      path: ['correctAnswer'],
    });
};

export type QuestionData = z.infer<ReturnType<typeof createQuestionSchema>>;
