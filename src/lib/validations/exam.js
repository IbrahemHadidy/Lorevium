import { z } from "zod";

export const examSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, {
        message: "Title must be at least 3 characters",
      })
      .refine((val) => val.length > 0, {
        message: "Title is required",
      }),
    description: z
      .string()
      .trim()
      .min(10, {
        message: "Description must be at least 10 characters",
      })
      .refine((val) => val.length > 0, {
        message: "Description is required",
      }),
    duration: z.coerce
      .number()
      .min(1, { message: "Duration must be at least 1 minute" })
      .max(1200, { message: "Duration must not exceed 1200 minutes" }),
    questions: z.array(z.string()),
    classLevel: z.enum(
      ["Grade 1 Secondary", "Grade 2 Secondary", "Grade 3 Secondary"],
      {
        required_error: "Class level is required",
        invalid_type_error: "Invalid class level selected",
      }
    ),
    isPublished: z.boolean({ required_error: "Publish status is required" }),
    startDate: z
      .string({ required_error: "Start date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date format",
      }),
    endDate: z
      .string({ required_error: "End date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date format",
      }),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be before end date",
    path: ["endDate"],
  });
