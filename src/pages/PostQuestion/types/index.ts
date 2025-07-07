export type PART_NAME =
  | 'common'
  | 'plan'
  | 'design'
  | 'server'
  | 'ios'
  | 'android'
  | 'web';

export type GROUP = 'YB' | 'OB';

export type Question = {
  id?: number;
  questionOrder: number;
  part: PART_NAME;
  content: string;
  isDescription: boolean;
  charLimit: number;
  required: boolean;
  link: string;
  placeholder: string;
  isFile: boolean;
};

export type QuestionSubmitRequest = {
  season: number;
  group: GROUP;
  questions: Question[];
  deleteQuestionIdList: number[];
};
