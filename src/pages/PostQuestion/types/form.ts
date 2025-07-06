import { z } from 'zod/v4';

const questionSchema = z.object({
  question: z.string(),
  link: z.url(),
  placeholder: z.string(),
  file: z.any().refine((files) => files?.[0] instanceof File, {
    message: '파일을 선택해주세요',
  }),
  maxText: z.number(),
});

export const questionsListSchema = z.object({
  questionList: z.array(questionSchema),
});

export type qustionListTypes = z.infer<typeof questionsListSchema>;
