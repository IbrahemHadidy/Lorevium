import { HighSchool } from '@/lib/enums/high-school';
import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'Lessons'>>;

export const createLessonSchema = (t: Translations) =>
  z.object({
    title: z.string().min(3, { message: t('Errors.titleLength', { min: 3 }) }),
    description: z.string().min(5, { message: t('Errors.descriptionLength', { min: 5 }) }),
    video: z.string().url({ message: t('Errors.invalidUrl') }),
    classLevel: z.nativeEnum(HighSchool),
    price: z.coerce.number().optional(),
    scheduledDate: z
      .string()
      .refine((v) => !isNaN(Date.parse(v)), { message: t('Errors.invalidDate') }),
  });

export type LessonData = z.infer<ReturnType<typeof createLessonSchema>>;
