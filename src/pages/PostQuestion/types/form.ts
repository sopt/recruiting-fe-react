import { z } from 'zod/v4';

const ERROR_MESSAGE = {
  INVALID_URL: '유효한 링크를 입력해주세요.',
  ONLY_NUMBER: '숫자인지 다시 확인해주세요.',
};

const questionSchema = z
  .object({
    id: z.number().optional(),
    content: z.string().min(1),
    isDescription: z.boolean(),
    isLink: z.boolean(),
    link: z.url({ message: ERROR_MESSAGE.INVALID_URL }).nullable().optional(),
    placeholder: z.string().min(1),
    isFile: z.boolean(),
    charLimit: z.number({ message: ERROR_MESSAGE.ONLY_NUMBER }).min(0),
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
