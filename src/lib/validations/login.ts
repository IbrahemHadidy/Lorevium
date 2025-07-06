import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type Translations = ReturnType<typeof useTranslations<'Login'>>;

export const createLoginSchema = (t: Translations) => {
  return z.object({
    email: z
      .string()
      .trim()
      .email({
        message: t('Errors.invalidEmail'),
      }),
    password: z.string().min(8, {
      message: t('Errors.passwordLength', { minLength: 8 }),
    }),
  });
};

export type LoginData = z.infer<ReturnType<typeof createLoginSchema>>;
