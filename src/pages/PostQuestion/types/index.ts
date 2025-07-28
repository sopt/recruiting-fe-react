import type { PartType } from '@/pages/Application/\btypes';

export type Group = 'YB' | 'OB';

export type Question = {
  id?: number;
  questionOrder: number;
  part: Omit<PartType, 'ALL'> | null;
  content: string;
  isDescription: boolean;
  charLimit: number | null;
  required: boolean;
  link?: string | null;
  placeholder: string;
  isFile: boolean;
};

export type QuestionSubmitRequest = {
  season: number;
  group: Group;
  questions: Question[];
  deleteQuestionIdList: number[];
};

export type QuestionResponse = {
  id: number;
  questionOrder: number;
  content: string;
  isDescription: boolean;
  charLimit: number;
  required: boolean;
  link: string | null;
  placeholder: string;
  isFile: boolean;
  isActive: boolean;
};

export type PartQuestionList = {
  part: string;
  questions: Question[];
};

export type QuestionListResponse = {
  err: boolean;
  commonQuestions: Question[];
  partQuestions: PartQuestionList[];
};
