import { z } from "zod";

export const questionSchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(3, { message: "Question text must be at least 3 characters long" })
      .refine((val) => val.length > 0, {
        message: "Question text is required",
      }),
    type: z.enum(["multiple-choice", "true-false", "short-answer"], {
      required_error: "Question type is required",
      invalid_type_error: "Invalid question type",
    }),
    options: z
      .array(z.string())
      .min(2, { message: "At least two options are required" }),
    correctAnswer: z.string(),
    exam: z.string(),
    points: z.coerce
      .number()
      .min(1, { message: "Points must be at least 1" })
      .max(100, { message: "Points cannot exceed 100" }),
  })
  .refine((data) => data.options.includes(data.correctAnswer), {
    message: "Correct answer must be one of the options",
    path: ["correctAnswer"],
  });
