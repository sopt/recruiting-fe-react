import { z } from 'zod/v4';

const questionSchema = z
  .object({
    id: z.number().optional(),
    content: z.string().min(1),
    isDescription: z.boolean(),
    isLink: z.boolean(),
    link: z.url().nullable().optional(),
    placeholder: z.string().min(1),
    isFile: z.boolean(),
    charLimit: z.number().min(1),
    required: z.boolean(),
    isActive: z.boolean(),
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
