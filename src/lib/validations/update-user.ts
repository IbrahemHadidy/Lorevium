import { HighSchool } from '@/lib/enums/high-school';
import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'RegisterAndUpdate'>>;

export const createUpdateSchema = (t: Translations) => {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(3, {
        message: t('Errors.fullNameLength', { min: 3 }),
      })
      .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
    email: z
      .string()
      .trim()
      .email({
        message: t('Errors.invalidEmail'),
      })
      .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
    phoneNumber: z
      .string()
      .trim()
      .min(7, t('Errors.phoneTooShort'))
      .regex(/^\+?[0-9]{7,15}$/, t('Errors.invalidPhone')),
    classLevel: z.nativeEnum(HighSchool, {
      required_error: t('Errors.classLevelRequired'),
      invalid_type_error: t('Errors.invalidClassLevel'),
    }),
  });
};

export type UpdateData = z.infer<ReturnType<typeof createUpdateSchema>>;
