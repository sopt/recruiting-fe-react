import type { Group } from '@/pages/PostQuestion/types';

export type SoptPartType =
  | '공통'
  | '기획'
  | '디자인'
  | '서버'
  | 'iOS'
  | '안드로이드'
  | '웹';

export enum SoptPart {
  공통 = '공통',
  기획 = '기획',
  디자인 = '디자인',
  서버 = '서버',
  iOS = 'iOS',
  안드로이드 = '안드로이드',
  웹 = '웹',
}

export type PartType =
  | '공통'
  | 'PM'
  | 'PD'
  | 'CX'
  | 'FE'
  | 'BE'
  | 'iOS'
  | 'Android';

export enum Part {
  공통 = '공통',
  PM = 'PM',
  PD = 'PD',
  CX = 'CX',
  FE = 'FE',
  BE = 'BE',
  iOS = 'iOS',
  Android = 'Android',
}

export type ExecutiveType =
  | 'PLAN'
  | 'ANDROID'
  | 'FINANCE'
  | 'IOS'
  | 'WEB'
  | 'DESIGN'
  | 'OPERATION'
  | 'MEDIA'
  | 'SERVER'
  | 'PRESIDENT'
  | 'VICE_PRESIDENT';

export type StatusType = '최종 합격' | '불합격' | '서류 합격' | '확인 전';

export const STATUS_TRANSLATOR = {
  '최종 합격': 'FINAL_PASS',
  불합격: 'FAIL',
  '서류 합격': 'INTERVIEW_PASS',
  '확인 전': 'NOT_EVALUATED',
};

export type SOPTPart = '기획' | '디자인' | '서버' | 'iOS' | '안드로이드' | '웹';

export interface ApplicationTableProps {
  isLoading: boolean;
  data: {
    id: number;
    status: StatusType;
    name: string;
    pictureUrl: string;
    part: PartType | SoptPartType;
    dontReadInfo: {
      checkedByMe: boolean;
      checkedList: string[];
    };
    evaluatedInfo: {
      checkedByMe: boolean;
      checkedList: string[];
    };
    submittedAt: string;
    generation: number;
    birth: string;
    university: string;
    major: string;
    mostRecentSeason: number;
    email: string;
    phone: string;
  }[];
}
[];

export interface GetApplicantListRequest {
  season: number;
  group: Group;
  part?: PartType | SoptPartType;
  offset: number;
  limit: number;
  hideEvaluated: boolean;
  checkInterviewPass: boolean;
  passStatus: string;
  searchKeyword: string;
}

export interface GetApplicantListResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      id: number;
      status: StatusType;
      name: string;
      pictureUrl: string;
      part: PartType | SoptPartType;
      dontReadInfo: {
        checkedByMe: boolean;
        checkedList: string[];
      };
      evaluatedInfo: {
        checkedByMe: boolean;
        checkedList: string[];
      };
      submittedAt: string;
      generation: number;
      birth: string;
      university: string;
      major: string;
      mostRecentSeason: number;
      email: string;
      phone: string;
    }[];
    meta: {
      currentPage: number;
      limit: number;
      offset: number;
      total: number;
      totalPage: number;
    };
  };
}

export interface PostApplicantPassStatusRequest {
  applicantId: number;
  applicationPass: boolean | null;
  finalPass: boolean | null;
}

// DONT_READ: 읽지마시오 여부, EVALUATION: 평가 완료 여부
export type EvaluationToggleType = 'DONT_READ' | 'EVALUATION';

export interface PostEvaluationRequest {
  applicantId: number;
  evaluationType: EvaluationToggleType;
  isChecked: boolean;
}

export interface PostMinRateRequest {
  minimumRate: number;
  season: string;
  group: Group;
  selectedPart: PartType | SoptPartType;
}

export interface PostMinRateResponse {
  success: boolean;
  message: string;
  data: {
    err: boolean;
    season: number;
    group: string;
    part: string;
    minRate: number;
    questions: {
      questionId: number;
      questionOrder: number;
      charLimit: number;
      charLimitLength: number;
    }[];
  };
}

export interface QuestionCharLimit {
  questionId: number;
  questionOrder: number;
  charLimit: number;
  charLimitLength: number;
}

export type PassInfo =
  | 'ALL'
  | 'INTERVIEW_PASS'
  | 'FINAL_PASS'
  | 'FAIL'
  | 'NOT_EVALUATED';

export interface ApplicantState {
  season: string;
  group: Group;
  evaluatedInfo: {
    checkedByMe: boolean;
  };
  isPassedOnly: boolean;
  selectedPart: PartType | SoptPartType;
  passStatus: string;
  searchKeyword: string;
}
