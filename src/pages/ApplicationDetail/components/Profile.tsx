import { AlertTriangle } from '@/assets/svg';
import ChipDropDown from '@/pages/Application/components/ChipDropdown';
import type { ApplicantType } from '@/pages/ApplicationDetail/types';
import { CheckBox } from '@sopt-makers/ui';
import { useState } from 'react';

interface ProfileProps {
  profileData?: ApplicantType;
}

const Profile = ({ profileData }: ProfileProps) => {
  const [passStatus, setPassStatus] = useState<string>('서류 합격');

  if (!profileData) {
    return <></>;
  }

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
                status={passStatus}
                onStatusChange={(value) => setPassStatus(value)}
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
          <div className="flex flex-row  gap-[0.6rem]">
            <AlertTriangle width={16} />
            <span className="label_5_11_sb text-secondary">
              기획, 디자인, 서버, 안드로이드, 웹이(가) 읽지 말라고 선택했어요.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[0.7rem] w-[32rem]">
          <div className="flex flex-row gap-[0.8rem]">
            <CheckBox
              size="lg"
              checked={profileData.evaluatedInfo.checkedByMe}
            />
            <span className="body_2_16_m text-white">평가 완료</span>
          </div>
          <div className="flex flex-row  gap-[0.6rem]">
            <AlertTriangle width={16} />
            <span className="label_5_11_sb text-secondary">
              기획, 디자인, 서버, 안드로이드, 웹이(가) 평가를 완료했어요.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
