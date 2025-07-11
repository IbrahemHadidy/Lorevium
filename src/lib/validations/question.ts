import { QuestionType } from '@/lib/enums/question-type';
import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'Questions'>>;

export const createQuestionSchema = (t: Translations) =>
  z
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
      options: z.array(z.string()).optional(),
      correctAnswer: z.string(),
      exam: z.string(),
      points: z.coerce
        .number()
        .min(1, { message: t('Errors.pointsMin', { min: 1 }) })
        .max(100, { message: t('Errors.pointsMax', { max: 100 }) }),
    })
    .superRefine((data, ctx) => {
      if (data.type === QuestionType.MULTIPLE_CHOICE) {
        // 1) must have at least two options
        if (data.options?.length ?? 0 < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['options'],
            message: t('Errors.optionsLength'),
          });
        }
        // 2) correctAnswer must be one of the options
        if (!data.options?.includes(data.correctAnswer)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['correctAnswer'],
            message: t('Errors.correctAnswerNotInOptions'),
          });
        }
      }
    });

export type QuestionData = z.infer<ReturnType<typeof createQuestionSchema>>;
