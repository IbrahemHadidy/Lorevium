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
import { useQuestionSubmit } from '@/hooks/submitions/use-question-submit';
import { useFormWithValidation } from '@/hooks/use-form-with-validation';
import { QuestionType } from '@/lib/enums/question-type';
import { Exam } from '@/lib/types/models/exam';
import type { Question } from '@/lib/types/models/question';
import { createQuestionSchema, type QuestionData } from '@/lib/validations/question';
import { LoaderCircle, PlusCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function QuestionFormModal({
  onAdd,
  examId,
  values,
  type = 'create',
}: {
  onAdd: (data: QuestionData & { exam: string }) => void;
  examId: string;
  values?: Question;
  type?: 'create' | 'update';
}) {
  const t = useTranslations('Questions');
  const form = useFormWithValidation<QuestionData>(
    createQuestionSchema(t),
    type === 'update' && values
      ? {
          ...values,
          exam: (values.exam as Exam)._id,
        }
      : { exam: examId }
  );
  const { submit, isLoading, error } = useQuestionSubmit({
    type,
    reset: form.reset,
    examId,
  });

  const watched = form.watch();
  const watchType = watched.type ?? QuestionType.MULTIPLE_CHOICE;
  const watchOptions = watched.options ?? [];

  const addOption = () => {
    form.setValue('options' as const, [...watchOptions, '']);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const createdId = await submit(data, values?._id);
          if (createdId) onAdd({ ...data, exam: createdId });
        })}
        className="flex flex-col gap-4"
      >
        {/* Question text */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('text')}</FormLabel>
              <FormControl>
                <Input placeholder={t('textPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('questionType')}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('questionTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={QuestionType.MULTIPLE_CHOICE}>
                      {t('multipleChoice')}
                    </SelectItem>
                    <SelectItem value={QuestionType.TRUE_FALSE}>{t('trueFalse')}</SelectItem>
                    <SelectItem value={QuestionType.SHORT_ANSWER}>{t('shortAnswer')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Options (only for multiple choice) */}
        {watchType === QuestionType.MULTIPLE_CHOICE && (
          <div className="flex flex-col gap-2">
            <FormLabel>{t('options')}</FormLabel>
            {watchOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder={t('optionPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const updated = [...watchOptions];
                    updated.splice(index, 1);
                    form.setValue('options' as const, updated);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addOption}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('addOption')}
            </Button>
          </div>
        )}

        {/* Correct answer */}
        {watchType === QuestionType.MULTIPLE_CHOICE && (
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('correctAnswer')}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('correctAnswerPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {watchOptions.map((option, index) => (
                        <SelectItem key={index} value={option || `option-${index}`}>
                          {option || t('emptyOption')}
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

        {watchType === QuestionType.TRUE_FALSE && (
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('correctAnswer')}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('correctAnswerPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True">{t('true')}</SelectItem>
                      <SelectItem value="False">{t('false')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchType === QuestionType.SHORT_ANSWER && (
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('correctAnswer')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('correctAnswerPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Points */}
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('points')}</FormLabel>
              <FormControl>
                <Input type="number" placeholder={t('pointsPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error ||
          (form.formState.errors.root?.message && (
            <p
              role="alert"
              className="text-foreground rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm dark:border-red-800 dark:bg-red-900"
            >
              {error || form.formState.errors.root?.message}
            </p>
          ))}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              {type === 'create' ? t('creatingQuestion') : t('updatingQuestion')}
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              {type === 'create' ? t('createQuestionButton') : t('updateQuestionButton')}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
