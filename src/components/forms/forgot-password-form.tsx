'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForgotPasswordSubmit } from '@/hooks/submitions/use-forgot-password-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import {
  type ForgotPasswordData,
  createForgotPasswordSchema,
} from '@/lib/validations/forgot-password';
import { KeyRound, LoaderCircle, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('ForgotPassword');
  const form = useFormWithValidation<ForgotPasswordData>(createForgotPasswordSchema(t));
  const { handleForgotPassword, isLoading, error } = useForgotPasswordSubmit({ reset: form.reset });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPassword)}
        className={cn('flex flex-col gap-6', className)}
        aria-label={t('formAriaLabel')}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground text-sm text-balance">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">{t('email')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <Mail className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(error || form.formState.errors.root?.message) && (
            <p
              role="alert"
              className="text-foreground rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm dark:border-red-800 dark:bg-red-900"
            >
              {error || form.formState.errors.root?.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || form.formState.isSubmitting}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="me-2 h-4 w-4 animate-spin" />
                {t('sending')}
              </>
            ) : (
              <>
                <KeyRound className="me-2 h-4 w-4" />
                {t('resetPasswordButton')}
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          {t('rememberPassword')}{' '}
          <Link href="/login" className="underline underline-offset-4">
            {t('loginNow')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
