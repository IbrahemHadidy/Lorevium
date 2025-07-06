'use client';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/data-time-picker';
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
import { Switch } from '@/components/ui/switch';
import { useExamSubmit } from '@/hooks/submitions/use-exam-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { HighSchool } from '@/lib/enums/high-school';
import type { Exam } from '@/lib/types/models/exam';
import type { Question } from '@/lib/types/models/question';
import { cn } from '@/lib/utils/cn';
import { createExamSchema, type ExamData } from '@/lib/validations/exam';
import { BookOpen, Clock, FileText, LoaderCircle, PlusCircle, Tag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function ExamForm({
  className,
  type,
  data,
  ...props
}: React.ComponentProps<'form'> & { type: 'create' | 'update'; data?: Exam }) {
  const t = useTranslations('Exams');
  const tClassLevel = useTranslations('ClassLevel');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const form = useFormWithValidation<ExamData>(createExamSchema(t), {
    title: data?.title ?? '',
    description: data?.description ?? '',
    classLevel: data?.classLevel ?? HighSchool.G_1_SECONDARY,
    duration: data?.duration ?? 0,
    startDate: data?.startDate ?? new Date().toISOString(),
    endDate: data?.endDate ?? new Date().toISOString(),
    isPublished: data?.isPublished ?? false,
    questions: data?.questions.map((q) => (q as Question)?._id) ?? [],
  });

  const { submit, isLoading, error } = useExamSubmit({ type, reset: form.reset });

  return (
    <div className={cn('flex flex-col', className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData) => submit(formData, data?._id))}
          aria-label={t('formAriaLabel')}
          {...props}
        >
          <div className="grid gap-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">{t('examTitle')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="title"
                        type="text"
                        placeholder={t('titlePlaceholder')}
                        {...field}
                        className="ps-10"
                      />
                      <Tag className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">{t('description')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="description"
                        type="text"
                        placeholder={t('descriptionPlaceholder')}
                        {...field}
                        className="ps-10"
                      />
                      <FileText className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="duration">{t('duration')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="duration"
                        type="number"
                        dir={isRtl ? 'rtl' : 'ltr'}
                        placeholder={t('durationPlaceholder')}
                        {...field}
                        className="ps-10"
                      />
                      <Clock className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="startDate">{t('startDate')}</FormLabel>
                  <FormControl>
                    <DateTimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="endDate">{t('endDate')}</FormLabel>
                  <FormControl>
                    <DateTimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Class Level */}
            <FormField
              control={form.control}
              name="classLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="classLevel">{t('classLevel')}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="relative w-full ps-10">
                        <SelectValue placeholder={t('classLevelPlaceholder')} />
                        <BookOpen className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
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

            {/* isPublished */}
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{t('isPublished')}</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Error message */}
            {(error || form.formState.errors.root?.message) && (
              <p
                role="alert"
                className="text-foreground rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm dark:border-red-800 dark:bg-red-900"
              >
                {error || form.formState.errors.root?.message}
              </p>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || form.formState.isSubmitting}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  {type === 'create' ? t('creatingExam') : t('updatingExam')}
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {type === 'create' ? t('createExamButton') : t('updateExamButton')}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
