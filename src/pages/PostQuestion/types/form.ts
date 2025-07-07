import { z } from 'zod/v4';

const questionSchema = z
  .object({
    id: z.number().optional(),
    question: z.string(),
    isLink: z.boolean(),
    link: z.url().optional(),
    placeholder: z.string(),
    isFile: z.boolean(),
    charLimit: z.number(),
  })
  .check((ctx) => {
    if (ctx.value.isLink && !ctx.value.link) {
      ctx.issues.push({
        message: '필수 입력란입니다.',
        input: ctx.value,
        path: ['link'],
        code: 'custom',
      });
    }
  });

export const questionsListSchema = z.object({
  questionList: z.array(questionSchema),
});

export type qustionListTypes = z.infer<typeof questionsListSchema>;
