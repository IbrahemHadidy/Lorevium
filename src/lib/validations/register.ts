import { HighSchool } from '@/lib/enums/high-school';
import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'RegisterAndUpdate'>>;

export const createRegisterSchema = (t: Translations) => {
  return z
    .object({
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
      password: z
        .string()
        .min(8, { message: t('Errors.passwordMinLength', { min: 8 }) })
        .max(32, { message: t('Errors.passwordMaxLength', { max: 32 }) })
        .regex(/[A-Z]/, { message: t('Errors.passwordUppercase') })
        .regex(/[a-z]/, { message: t('Errors.passwordLowercase') })
        .regex(/\d/, { message: t('Errors.passwordNumber') })
        .regex(/[^A-Za-z0-9]/, { message: t('Errors.passwordSymbol') })
        .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
      cpassword: z.string(),
      phoneNumber: z
        .string()
        .trim()
        .min(7, t('Errors.phoneTooShort'))
        .regex(/^\+?[0-9]{7,15}$/, t('Errors.invalidPhone')),
      classLevel: z.nativeEnum(HighSchool, {
        required_error: t('Errors.classLevelRequired'),
        invalid_type_error: t('Errors.invalidClassLevel'),
      }),
    })
    .superRefine((values, ctx) => {
      if (values.password !== values.cpassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('Errors.passwordsMustMatch'),
          path: ['cpassword'],
        });
      }
    });
};

export type RegisterData = z.infer<ReturnType<typeof createRegisterSchema>>;
