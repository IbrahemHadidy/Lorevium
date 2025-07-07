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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useResetPasswordSubmit } from '@/hooks/submitions/use-reset-password-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { Role } from '@/lib/enums/role';
import { Link } from '@/lib/i18n/navigation';
import { useAppSelector } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import {
  createResetPasswordSchema,
  type ResetPasswordData,
} from '@/lib/validations/reset-password';
import { Eye, EyeOff, KeyRound, LoaderCircle, Lock, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ResetPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('ResetPassword');
  const form = useFormWithValidation<ResetPasswordData>(createResetPasswordSchema(t));
  const { handleResetPassword, isLoading, error } = useResetPasswordSubmit({ reset: form.reset });
  const { user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfimPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
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

          {/* OTP */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="otp">{t('otp')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="w-full">
                        <div className="dark:bg-input/30 relative h-9 w-9 flex-1 rounded-s-lg border">
                          <KeyRound className="absolute start-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <InputOTPSlot index={0} className="flex-1" />
                        <InputOTPSlot index={1} className="flex-1" />
                        <InputOTPSlot index={2} className="flex-1" />
                        <InputOTPSlot index={3} className="flex-1" />
                        <InputOTPSlot index={4} className="flex-1" />
                        <InputOTPSlot index={5} className="flex-1" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPassword">{t('newPassword')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('newPasswordPlaceholder')}
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

          {/* Confirm new password */}
          <FormField
            control={form.control}
            name="cpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cpassword">{t('confirmNewPassword')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="cpassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('confirmNewPasswordPlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <Lock className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfimPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground absolute end-3 bottom-2.5"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Errors */}
          {(error || form.formState.errors.root?.message) && (
            <p
              role="alert"
              className="text-foreground rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm dark:border-red-800 dark:bg-red-900"
            >
              {error || form.formState.errors.root?.message}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || form.formState.isSubmitting}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                {t('resetting')}
              </>
            ) : (
              <>
                <KeyRound className="mr-2 h-4 w-4" />
                {t('resetButton')}
              </>
            )}
          </Button>
        </div>

        {user?.role !== Role.SUPER_ADMIN && (
          <div className="text-center text-sm">
            {t('rememberPassword')}{' '}
            <Link href="/login" className="underline underline-offset-4">
              {t('loginNow')}
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
