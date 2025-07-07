import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'ResetPassword'>>;

export const createResetPasswordSchema = (t: Translations) => {
  return z
    .object({
      email: z
        .string()
        .trim()
        .email({
          message: t('Errors.invalidEmail'),
        })
        .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
      otp: z
        .string()
        .min(6, { message: t('Errors.otpLength', { num: 6 }) })
        .max(6, { message: t('Errors.otpLength', { num: 6 }) })
        .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
      newPassword: z
        .string()
        .min(8, { message: t('Errors.passwordMinLength', { min: 8 }) })
        .max(32, { message: t('Errors.passwordMaxLength', { max: 32 }) })
        .regex(/[A-Z]/, { message: t('Errors.passwordUppercase') })
        .regex(/[a-z]/, { message: t('Errors.passwordLowercase') })
        .regex(/\d/, { message: t('Errors.passwordNumber') })
        .regex(/[^A-Za-z0-9]/, { message: t('Errors.passwordSymbol') })
        .refine((val) => val.length > 0, { message: t('Errors.requiredField') }),
      cpassword: z.string(),
    })
    .superRefine((values, ctx) => {
      if (values.newPassword !== values.cpassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('Errors.passwordsMustMatch'),
          path: ['cpassword'],
        });
      }
    });
};

export type ResetPasswordData = z.infer<ReturnType<typeof createResetPasswordSchema>>;
