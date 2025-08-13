import z from 'zod';

export interface Season {
  id: number;
  season: number;
  name: string;
  group: 'YB' | 'OB';
  applicationStart: string;
  applicationEnd: string;
  interviewStart: string;
  interviewEnd: string;
  applicationResultStart: string;
  applicationResultEnd: string;
  finalResultStart: string;
  finalResultEnd: string;
}

export interface GetGenerationResponse {
  err: boolean;
  seasons: Season[];
}

export interface PostGenerationRequest extends Omit<Season, 'id' | 'group'> {
  type: 'YB' | 'OB';
}

export interface PostGenerationResponse {
  err: boolean;
  seasons: Omit<Season, 'id'>[];
}

const timeSchema = z
  .string()
  .min(1)
  .refine((v) => {
    const h = Number.parseInt(v.slice(0, 2), 10);
    const m = Number.parseInt(v.slice(2, 4), 10);
    return h >= 0 && h <= 23 && m >= 0 && m <= 59;
  });

export const postGenerationSchema = z.object({
  generationName: z.string().min(1).max(30, '기수명은 30자 이하여야 합니다.'),
  type: z.enum(['YB', 'OB']),
  generation: z.string().min(1),
  application: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  applicationResult: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  interview: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  finalResult: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  applicationStartTime: timeSchema,
  applicationEndTime: timeSchema,
  applicationResultStartTime: timeSchema,
  applicationResultEndTime: timeSchema,
  interviewStartTime: timeSchema,
  interviewEndTime: timeSchema,
  finalResultStartTime: timeSchema,
  finalResultEndTime: timeSchema,
});

export type PostGenerationFormData = z.infer<typeof postGenerationSchema>;

export type DateRangeField =
  | 'application'
  | 'applicationResult'
  | 'interview'
  | 'finalResult';

export type TimeField =
  | 'applicationStartTime'
  | 'applicationEndTime'
  | 'applicationResultStartTime'
  | 'applicationResultEndTime'
  | 'interviewStartTime'
  | 'interviewEndTime'
  | 'finalResultStartTime'
  | 'finalResultEndTime';
