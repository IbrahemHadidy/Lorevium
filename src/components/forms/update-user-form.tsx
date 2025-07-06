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
import { useUpdateSubmit } from '@/hooks/submitions/use-update-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { HighSchool } from '@/lib/enums/high-school';
import { Role } from '@/lib/enums/role';
import { useAppSelector } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { type UpdateData, createUpdateSchema } from '@/lib/validations/update-user';
import { LoaderCircle, UserPen } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function UpdateUserForm({ className, ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('RegisterAndUpdate');
  const tClassLevel = useTranslations('ClassLevel');
  const { handleUpdate, isLoading, error } = useUpdateSubmit();
  const form = useFormWithValidation<UpdateData>(createUpdateSchema(t));
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className={cn('flex flex-col gap-6', className)}
        aria-label={t('formAriaLabelUpdate')}
        {...props}
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  defaultValue={user?.fullName}
                  {...field}
                />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={user?.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  defaultValue={user?.phoneNumber}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class Level */}
        {user?.role === Role.USER && (
          <FormField
            control={form.control}
            name="classLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={user?.classLevel} {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your class level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(HighSchool).map((level) => (
                      <SelectItem key={level} value={level}>
                        {tClassLevel(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          type="button"
          disabled={isLoading || form.formState.isSubmitting}
          className="w-full"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              {t('updatingAccount')}
            </>
          ) : (
            <>
              <UserPen className="mr-2 h-4 w-4" />
              {t('updateAccountButton')}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
