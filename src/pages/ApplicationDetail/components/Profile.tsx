import { AlertTriangle } from '@/assets/svg';
import type { StatusType } from '@/pages/Application/\btypes';

import ChipDropDown from '@/pages/Application/components/ChipDropdown';
import { usePostApplicantPassStatus } from '@/pages/Application/hooks/queries';
import {
  convertPassInfoToStatus,
  convertStatusToPassInfo,
} from '@/pages/Application/utils';
import type { ApplicantType } from '@/pages/ApplicationDetail/types';
import {
  getDontReadMessage,
  getEvalutionCompleteMessage,
} from '@/pages/ApplicationDetail/utils';
import { CheckBox } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';

interface ProfileProps {
  profileData?: ApplicantType;
}

const Profile = ({ profileData }: ProfileProps) => {
  const queryClient = useQueryClient();

  const { mutate: passMutate } = usePostApplicantPassStatus();

  if (!profileData) {
    return <></>;
  }

  const handleStatusChange = (id: number, value: StatusType) => {
    const { applicationPass, finalPass } = convertStatusToPassInfo(value);

    passMutate(
      {
        applicantId: id,
        applicationPass,
        finalPass,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['applicant', 'detail', id],
          });
        },
      },
    );
  };

  return (
    <>
      <div className="flex gap-[2.4rem] ">
        <img
          src={profileData.pictureUrl}
          alt="프로필"
          className="w-[12.2rem] h-[16.4rem] rounded-[6px]"
        />
        <div className="flex flex-col my-[2.4rem]">
          <p className="mb-[1.2rem] title_3_24_sb">{profileData.name}</p>
          <div className="flex flex-row gap-[2rem]">
            <div className="flex flex-col gap-[0.6rem] w-[7.6rem]">
              <span className="body_2_16_r text-gray300">지원파트</span>
              <span className="body_2_16_r text-white">{profileData.part}</span>
            </div>
            <div className="flex flex-col gap-[0.6rem] w-[8.3rem]">
              <span className="body_2_16_r text-gray300">합격여부</span>
              <ChipDropDown
                status={convertPassInfoToStatus(profileData.status)}
                onStatusChange={(value) => {
                  handleStatusChange(profileData.id, value as StatusType);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[7.6rem_1fr_7.6rem_1fr] gap-x-[1.6rem] gap-y-[2rem] rounded-[12px] bg-gray800 px-[2.4rem] py-[2rem]">
        <span className="body_2_16_r text-gray300">ID</span>
        <span className="body_2_16_m text-white">{profileData.id}</span>
        <span className="body_2_16_r text-gray300">최근 기수</span>
        <span className="body_2_16_m text-white">{profileData.generation}</span>
        <span className="body_2_16_r text-gray300">이메일</span>
        <span className="body_2_16_m text-white">{profileData.email}</span>
        <span className="body_2_16_r text-gray300">전화번호</span>
        <span className="body_2_16_m text-white">{profileData.phone}</span>
        <span className="body_2_16_r text-gray300">대학교</span>
        <span className="body_2_16_m text-white">{profileData.university}</span>
        <span className="body_2_16_r text-gray300">학과</span>
        <span className="body_2_16_m text-white">{profileData.major}</span>
        <span className="body_2_16_r text-gray300">생년월일</span>
        <span className="body_2_16_m text-white">{profileData.birth}7</span>
        <span className="body_2_16_r text-gray300">제출시간</span>
        <span className="body_2_16_m text-white">
          {profileData.submittedAt}
        </span>
      </div>

      <div className="flex flex-row gap-[3.2rem] px-[2.4rem] py-[2rem] rounded-[12px] bg-gray800">
        <div className="flex flex-col gap-[0.7rem] w-[32rem]">
          <div className="flex flex-row gap-[0.8rem]">
            <CheckBox
              size="lg"
              checked={profileData.dontReadInfo.checkedByMe}
            />
            <span className="body_2_16_m text-white">읽지 마시오</span>
          </div>
          {profileData.dontReadInfo.checkedList.length > 0 && (
            <div className="flex flex-row  gap-[0.6rem]">
              <AlertTriangle width={16} />
              <span className="label_5_11_sb text-secondary">
                {getDontReadMessage(profileData.dontReadInfo.checkedList)}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[0.7rem] w-[32rem]">
          <div className="flex flex-row gap-[0.8rem]">
            <CheckBox
              size="lg"
              checked={profileData.evaluatedInfo.checkedByMe}
            />
            <span className="body_2_16_m text-white">평가 완료</span>
          </div>
          {profileData.dontReadInfo.checkedList.length > 0 && (
            <div className="flex flex-row  gap-[0.6rem]">
              <span className="label_5_11_sb">
                {getEvalutionCompleteMessage(
                  profileData.evaluatedInfo.checkedList,
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
