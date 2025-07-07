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
import { useLoginSubmit } from '@/hooks/submitions/use-login-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { type LoginData, createLoginSchema } from '@/lib/validations/login';
import { Eye, EyeOff, LoaderCircle, Lock, LogIn, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('Login');
  const form = useFormWithValidation<LoginData>(createLoginSchema(t));
  const { handleLogin, isLoading, error } = useLoginSubmit({ reset: form.reset });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
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
                      type="text"
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

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel htmlFor="password">{t('password')}</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('passwordPlaceholder')}
                      autoComplete="current-password"
                      {...field}
                      className="ps-10"
                    />
                    <Lock className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground absolute end-3 bottom-2.5"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
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
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                {t('authenticating')}
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                {t('signInButton')}
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          {t('dontHaveAccount')}{' '}
          <Link href="/register" className="underline underline-offset-4">
            {t('registerNow')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
