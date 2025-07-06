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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRegisterSubmit } from '@/hooks/submitions/use-register-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { HighSchool } from '@/lib/enums/high-school';
import { Role } from '@/lib/enums/role';
import { Link } from '@/lib/i18n/navigation';
import { useAppSelector } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { createRegisterSchema, type RegisterData } from '@/lib/validations/register';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Phone, UserPlus, UserRound } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export default function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('RegisterAndUpdate');
  const tClassLevel = useTranslations('ClassLevel');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const form = useFormWithValidation<RegisterData>(createRegisterSchema(t));
  const { handleRegister, isLoading, error } = useRegisterSubmit({ reset: form.reset });
  const { user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className={cn('flex flex-col gap-6', className)}
        aria-label={t('formAriaLabel')}
        {...props}
      >
        {user?.role !== Role.SUPER_ADMIN && (
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground text-sm text-balance">{t('subtitle')}</p>
          </div>
        )}

        <div className="grid gap-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="fullName">{t('fullName')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t('fullNamePlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <UserRound className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Phone */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phoneNumber">{t('phone')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="phoneNumber"
                      type="tel"
                      dir={isRtl ? 'rtl' : 'ltr'}
                      placeholder={t('phonePlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <Phone className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
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
                <FormLabel htmlFor="password">{t('password')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('passwordPlaceholder')}
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

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="cpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cpassword">{t('confirmPassword')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="cpassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('passwordPlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <Lock className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showPassword)}
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

          {/* Class Level */}
          {user?.role !== Role.SUPER_ADMIN && (
            <FormField
              control={form.control}
              name="classLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="classLevel">{t('classLevel')}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('classLevelPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(HighSchool).map((level) => (
                          <SelectItem key={level} value={level}>
                            {tClassLevel(level)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
                {t('creatingAccount')}
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('createAccountButton')}
              </>
            )}
          </Button>
        </div>

        {user?.role !== Role.SUPER_ADMIN && (
          <div className="text-center text-sm">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="underline underline-offset-4">
              {t('signIn')}
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
}
