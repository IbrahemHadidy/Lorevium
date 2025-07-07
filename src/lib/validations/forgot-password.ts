import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'ForgotPassword'>>;

export const createForgotPasswordSchema = (t: Translations) => {
  return z.object({
    email: z
      .string()
      .trim()
      .email({
        message: t('invalidEmail'),
      }),
  });
};

export type ForgotPasswordData = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
