import type { ExecutiveType } from '@/pages/Application/\btypes';

export type ApplicantType = {
  id: number;
  status: 'NOT_EVALUATED' | 'EVALUATED' | string;
  name: string;
  pictureUrl: string;
  part: string;
  dontReadInfo: {
    checkedByMe: boolean;
    checkedList: ExecutiveType[];
  };
  evaluatedInfo: {
    checkedByMe: boolean;
    checkedList: ExecutiveType[];
  };
  submittedAt: string; // ISO datetime
  generation: string; // e.g. "YB"
  birth: string; // e.g. "1998-03-15"
  university: string;
  major: string;
  email: string;
  phone: string;
};

export type QuestionType = {
  id: number;
  questionOrder: number;
  part: string;
  content: string;
  isDescription: boolean;
  charLimit: number;
  required: boolean;
  link: string | null;
  placeholder: string;
  isFile: boolean;
  isActive: boolean;
  isCommon: boolean;
  answer: AnswerType | null;
};

export type AnswerType = {
  id: number;
  answer: string;
  fileUrl: string | null;
  fileName: string | null;
};

export interface ApplicationDetailResponse {
  success: boolean;
  data: {
    applicant: ApplicantType;
    commonQuestions: QuestionType[];
    partQuestions: QuestionType[];
  };
}
