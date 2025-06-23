import { z } from 'zod';

const questionSchema = z.object({
  question: z.string(),
  link: z.string().url(),
  answerPlaceHolder: z.string(),
  file: z.string(),
  maxText: z.number(),
});

export const questionsListSchema = z.object({
  questionList: z.array(questionSchema),
});

export type qustionListTypes = z.infer<typeof questionsListSchema>;
