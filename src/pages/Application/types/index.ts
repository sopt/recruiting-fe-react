export type PartType =
  | 'ALL'
  | 'PLAN'
  | 'DESIGN'
  | 'SERVER'
  | 'IOS'
  | 'ANDROID'
  | 'WEB';

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

export interface ApplicationTableProps
  extends Omit<GetApplicantListResponse, 'success' | 'message'> {}

export interface GetApplicantListRequest {
  season: number;
  group: string;
  part: PartType;
  offset: number;
  limit: number;
  minRate: number;
  hideEvaluated: boolean;
  hideDontRead: boolean;
  checkInterviewPass: boolean;
  isCompleteHidden: boolean;
  isDoNotRead: boolean;
  isPassedOnly: boolean;
}

export interface GetApplicantListResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    status: StatusType;
    name: string;
    pictureUrl: string;
    part: PartType;
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
    email: string;
    phone: string;
  }[];
}

export interface PostApplicantPassStatusRequest {
  applicantId: number;
  applicationPass: boolean;
  finalPass: boolean;
}
