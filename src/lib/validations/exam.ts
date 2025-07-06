import { HighSchool } from '@/lib/enums/high-school';
import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type ExamTranslations = ReturnType<typeof useTranslations<'Exams'>>;

export const createExamSchema = (tExam: ExamTranslations) => {
  return z
    .object({
      title: z
        .string()
        .trim()
        .min(3, {
          message: tExam('Errors.titleLength', { min: 3 }),
        })
        .refine((val) => val.length > 0, { message: tExam('Errors.requiredField') }),
      description: z
        .string()
        .trim()
        .min(10, {
          message: tExam('Errors.descriptionLength', { min: 10 }),
        })
        .refine((val) => val.length > 0, { message: tExam('Errors.requiredField') }),
      duration: z.coerce
        .number()
        .min(1, { message: tExam('Errors.durationMin', { min: 1 }) })
        .max(1200, { message: tExam('Errors.durationMax', { max: 1200 }) }),
      questions: z.array(z.string()),
      classLevel: z.nativeEnum(HighSchool, {
        required_error: tExam('Errors.classLevelRequired'),
        invalid_type_error: tExam('Errors.invalidClassLevel'),
      }),
      isPublished: z.boolean({ required_error: tExam('Errors.requiredField') }),
      startDate: z
        .string({ required_error: tExam('Errors.requiredField') })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: tExam('Errors.invalidDateFormat'),
        }),
      endDate: z
        .string({ required_error: tExam('Errors.requiredField') })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: tExam('Errors.invalidDateFormat'),
        }),
    })
    .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
      message: tExam('Errors.startDateBeforeEndDate'),
      path: ['endDate'],
    });
};

export type ExamData = z.infer<ReturnType<typeof createExamSchema>>;
