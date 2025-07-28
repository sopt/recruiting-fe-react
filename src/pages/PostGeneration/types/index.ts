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
});

export type PostGenerationFormData = z.infer<typeof postGenerationSchema>;
