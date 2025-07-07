import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
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
import { Switch } from "@/components/ui/switch";
import { useExamSubmit } from "@/hooks/submitions/useExamSubmit";
import { useFormWithValidation } from "@/hooks/useFormWithValidation";
import { cn } from "@/lib/utils";
import { examSchema } from "@/lib/validations/exam";
import {
  BookOpen,
  Clock,
  FileText,
  LoaderCircle,
  PlusCircle,
  Tag,
} from "lucide-react";

export default function ExamForm({ className, type, data, ...props }) {
  const form = useFormWithValidation(examSchema, {
    title: data?.title ?? "",
    description: data?.description ?? "",
    classLevel: data?.classLevel ?? "Grade 1 Secondary",
    duration: data?.duration ?? 0,
    startDate: data?.startDate ?? new Date().toISOString(),
    endDate: data?.endDate ?? new Date().toISOString(),
    isPublished: data?.isPublished ?? false,
    questions: data?.questions.map((q) => q?._id) ?? [],
  });

  const { submit, isLoading, error } = useExamSubmit({
    type,
    reset: form.reset,
  });

  return (
    <div className={cn("flex flex-col", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData) =>
            submit(formData, data?._id)
          )}
          aria-label="Exam form"
          {...props}
        >
          <div className="grid gap-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="title"
                        type="text"
                        placeholder="Enter exam title"
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
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="description"
                        type="text"
                        placeholder="Short description (optional)"
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
                  <FormLabel htmlFor="duration">Duration (minutes)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="duration"
                        type="number"
                        placeholder="Enter duration"
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
                  <FormLabel htmlFor="startDate">Start Date</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                  <FormLabel htmlFor="endDate">End Date</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                  <FormLabel htmlFor="classLevel">Class Level</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="relative w-full ps-10">
                        <SelectValue placeholder="Select class level" />
                        <BookOpen className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Grade 1 Secondary", "Grade 2 Secondary", "Grade 3 Secondary"].map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
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
                  <FormLabel>Published</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
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
                  {type === "create" ? "Creating exam..." : "Updating exam..."}
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {type === "create" ? "Create Exam" : "Update Exam"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
