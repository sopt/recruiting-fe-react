import { z } from 'zod/v4';

const questionSchema = z.object({
  id: z.number().optional(),
  question: z.string(),
  link: z.url(),
  placeholder: z.string(),
  isFile: z.boolean(),
  charLimit: z.number(),
});

export const questionsListSchema = z.object({
  questionList: z.array(questionSchema),
});

export type qustionListTypes = z.infer<typeof questionsListSchema>;
