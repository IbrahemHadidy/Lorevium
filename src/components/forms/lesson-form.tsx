'use client';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
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
import { useLessonSubmit } from '@/hooks/submitions/use-lesson-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { HighSchool } from '@/lib/enums/high-school';
import { cn } from '@/lib/utils/cn';
import { createLessonSchema, type LessonData } from '@/lib/validations/lesson';
import { BookOpen, DollarSign, FileText, LoaderCircle, PlusCircle, Tag, Video } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LessonForm({
  type,
  data,
  className,
  ...props
}: {
  type: 'create' | 'update';
  data?: LessonData & { _id: string };
} & React.ComponentProps<'form'>) {
  const t = useTranslations('Lessons');
  const tClassLevel = useTranslations('ClassLevel');

  const form = useFormWithValidation<LessonData>(createLessonSchema(t), {
    title: data?.title ?? '',
    description: data?.description ?? '',
    video: data?.video ?? '',
    classLevel: data?.classLevel ?? HighSchool.G_1_SECONDARY,
    price: data?.price ?? undefined,
    scheduledDate: data?.scheduledDate ?? new Date().toISOString(),
  });

  const { submit, isLoading, error } = useLessonSubmit({ type, reset: form.reset });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData) => submit(formData, data?._id))}
        className={cn('flex flex-col gap-6', className)}
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
                <FormLabel htmlFor="title">{t('lessonTitle')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="title"
                      placeholder={t('titlePlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <Tag
                      className={cn(
                        'text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2'
                      )}
                    />
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

          {/* Video URL */}
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="video">{t('videoUrl')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="video"
                      placeholder={t('videoPlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <Video className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                  </div>
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

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">{t('price')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="price"
                      type="number"
                      placeholder={t('pricePlaceholder')}
                      {...field}
                      className="ps-10"
                    />
                    <DollarSign className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Scheduled Date */}
          {type === 'create' && (
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="scheduledDate">{t('scheduledDate')}</FormLabel>
                  <FormControl>
                    <DateTimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Error message */}
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
            className="mt-4 w-full"
            disabled={isLoading || form.formState.isSubmitting}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                {type === 'create' ? t('creatingLesson') : t('updatingLesson')}
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                {type === 'create' ? t('createLessonButton') : t('updateLessonButton')}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
