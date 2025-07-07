import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuestionSubmit } from "@/hooks/submitions/useQuestionSubmit";
import { useFormWithValidation } from "@/hooks/useFormWithValidation";
import { questionSchema } from "@/lib/validations/question";
import { LoaderCircle, PlusCircle, X } from "lucide-react";

export default function QuestionFormModal({
  onAdd,
  examId,
  values,
  type = "create",
}) {
  const form = useFormWithValidation(
    questionSchema,
    type === "update" && values
      ? {
          ...values,
          exam: values.exam._id,
        }
      : { exam: examId }
  );

  const { submit, isLoading, error } = useQuestionSubmit({
    type,
    reset: form.reset,
    examId,
  });

  const watched = form.watch();
  const watchType = watched.type ?? 'multiple-choice';
  const watchOptions = watched.options ?? [];

  const addOption = () => {
    form.setValue("options", [...watchOptions, ""]);
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
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Input placeholder="Enter question text" {...field} />
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
              <FormLabel>Question Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'multiple-choice'}>
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value={'true-false'}>
                      True/False
                    </SelectItem>
                    <SelectItem value={'short-answer'}>
                      Short Answer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Options (only for multiple choice) */}
        {watchType === 'multiple-choice' && (
          <div className="flex flex-col gap-2">
            <FormLabel>Options</FormLabel>
            {watchOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder={`Option ${index + 1}`} {...field} />
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
                    form.setValue("options", updated);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addOption}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>
        )}

        {/* Correct answer */}
        {watchType === 'multiple-choice' && (
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {watchOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option || `option-${index}`}
                        >
                          {option || "(Empty option)"}
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

        {watchType === 'true-false' && (
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True">True</SelectItem>
                      <SelectItem value="False">False</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchType === 'short-answer' && (
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter correct answer" {...field} />
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
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of points"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message */}
        {error ||
          (form.formState.errors.root?.message && (
            <p
              role="alert"
              className="text-foreground rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm dark:border-red-800 dark:bg-red-900"
            >
              {error || form.formState.errors.root?.message}
            </p>
          ))}

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              {type === "create"
                ? "Creating question..."
                : "Updating question..."}
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              {type === "create" ? "Create Question" : "Update Question"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
