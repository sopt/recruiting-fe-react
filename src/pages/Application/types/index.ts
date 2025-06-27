export type PartType =
  | 'all'
  | 'plan'
  | 'design'
  | 'server'
  | 'ios'
  | 'android'
  | 'web';

export type StatusType = '최종 합격' | '불합격' | '서류 합격' | '확인 전';

export type SOPTPart = '기획' | '디자인' | '서버' | 'iOS' | '안드로이드' | '웹';

export interface ApplicationTableProps {
  data: {
    id: number;
    status: StatusType;
    profileImage: string;
    name: string;
    part: SOPTPart;
    isDoNotRead: boolean;
    doNotReadBy?: {
      기획?: boolean;
      디자인?: boolean;
      서버?: boolean;
      iOS?: boolean;
      안드로이드?: boolean;
      웹?: boolean;
      회장?: boolean;
    };
    evaluationStatus: boolean;
    evaluatedBy?: {
      기획?: boolean;
      디자인?: boolean;
      서버?: boolean;
      iOS?: boolean;
      안드로이드?: boolean;
      웹?: boolean;
      회장?: boolean;
    };
    submissionTime: string;
    recentGeneration: number;
    birth: string;
    university: string;
    major: string;
    email: string;
    phone: string;
  }[];
}
