export type PartName =
  | 'common'
  | 'plan'
  | 'design'
  | 'server'
  | 'ios'
  | 'android'
  | 'web';

export type Group = 'YB' | 'OB';

export type Question = {
  id?: number;
  questionOrder: number;
  part: PartName;
  content: string;
  isDescription: boolean;
  charLimit: number;
  required: boolean;
  link?: string;
  placeholder: string;
  isFile: boolean;
};

export type QuestionSubmitRequest = {
  season: number;
  group: Group;
  questions: Question[];
  deleteQuestionIdList: number[];
};
