import { z } from 'zod/v4';

const ERROR_MESSAGE = {
  INVALID_URL: '유효한 링크를 입력해주세요.',
  ONLY_NUMBER: '숫자인지 다시 확인해주세요.',
  REQUIRED_FIELD: '필수 입력란입니다.',
};

const questionSchema = z
  .object({
    id: z.number().optional(),
    content: z.string().min(1, { error: ERROR_MESSAGE.REQUIRED_FIELD }),
    isDescription: z.boolean(),
    isLink: z.boolean(),
    link: z.url({ error: ERROR_MESSAGE.INVALID_URL }).nullable().optional(),
    placeholder: z.string().nullable(),
    isFile: z.boolean(),
    charLimit: z.number({ error: ERROR_MESSAGE.ONLY_NUMBER }).nullable(),
    required: z.boolean(),
    isActive: z.boolean(),
    isAnswer: z.boolean(),
  })
  .check((ctx) => {
    if (ctx.value.isLink && !ctx.value.link) {
      ctx.issues.push({
        message: ERROR_MESSAGE.REQUIRED_FIELD,
        input: ctx.value.link,
        path: ['link'],
        code: 'custom',
      });
    }
  })
  .check((ctx) => {
    if (ctx.value.isAnswer) {
      if (!ctx.value.placeholder) {
        ctx.issues.push({
          code: 'custom',
          message: ERROR_MESSAGE.REQUIRED_FIELD,
          input: ctx.value.placeholder,
          path: ['placeholder'],
        });
      }
      if (!ctx.value.charLimit) {
        ctx.issues.push({
          code: 'custom',
          message: ERROR_MESSAGE.REQUIRED_FIELD,
          input: ctx.value.charLimit,
          path: ['charLimit'],
        });
      }
    }
  });

export const questionsListSchema = z.object({
  questionList: z.array(questionSchema),
});

export type qustionListTypes = z.infer<typeof questionsListSchema>;
