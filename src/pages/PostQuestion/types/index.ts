export type PartName =
  | '공통'
  | '기획'
  | '디자인'
  | '서버'
  | 'ios'
  | '안드로이드'
  | '웹';

export type Group = 'YB' | 'OB';

export type Question = {
  id?: number;
  questionOrder: number;
  part: Omit<PartName, '공통'> | null;
  content: string;
  isDescription: boolean;
  charLimit: number;
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
  partQuestions: PartQuestionList[];
};
