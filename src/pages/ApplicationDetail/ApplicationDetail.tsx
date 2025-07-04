import { AlertTriangle, ChevronLeft } from '@/assets/svg';
import QnaItem from '@/pages/ApplicationDetail/components/QnaItem';
import { CheckBox, Chip, Tab } from '@sopt-makers/ui';
import { useState } from 'react';

type questionType = 'common' | 'part';

const ApplicationDetail = () => {
  const [, setSelectedTab] = useState<questionType>('common');

  const handleTabChange = (tab: questionType) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col gap-[4.8rem] w-[98rem] p-[2.4rem] rounded-[14px] bg-gray900">
      <header className="flex flex-row gap-[1.8rem] align-center h-[3.6rem]">
        <button
          type="button"
          className="flex align-middle justify-center p-[0.8rem] rounded-[100px] bg-gray700"
        >
          <ChevronLeft width={20} />
        </button>
        <h2 className="title_4_20_sb">{`${35}기 YB`}</h2>
      </header>

      <div className="flex flex-col gap-[3.2rem] mx-[13rem]">
        <div className="flex gap-[2.4rem] ">
          <img
            src="https://m.sportsworldi.com/content/image/2024/04/21/20240421508714.jpg"
            alt="프로필"
            className="w-[12.2rem] h-[16.4rem] rounded-[6px]"
          />
          <div className="flex flex-col my-[2.4rem]">
            <p className="mb-[1.2rem] title_3_24_sb">김규홍</p>
            <div className="flex flex-row gap-[2rem]">
              <div className="flex flex-col gap-[0.6rem] w-[7.6rem]">
                <span className="body_2_16_r text-gray300">지원파트</span>
                <span className="body_2_16_r text-white">기획</span>
              </div>
              <div className="flex flex-col gap-[0.6rem] w-[8.1rem]">
                <span className="body_2_16_r text-gray300">합격여부</span>
                <Chip size="sm">서류 합격</Chip>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[7.6rem_1fr_7.6rem_1fr] gap-x-[1.6rem] gap-y-[2rem] rounded-[12px] bg-gray800 px-[2.4rem] py-[2rem]">
          <span className="body_2_16_r text-gray300">ID</span>
          <span className="body_2_16_m text-white">335</span>
          <span className="body_2_16_r text-gray300">최근 기수</span>
          <span className="body_2_16_m text-white">34</span>
          <span className="body_2_16_r text-gray300">이메일</span>
          <span className="body_2_16_m text-white">bobo3766@naver.com</span>
          <span className="body_2_16_r text-gray300">전화번호</span>
          <span className="body_2_16_m text-white">010-7630-0607</span>
          <span className="body_2_16_r text-gray300">대학교</span>
          <span className="body_2_16_m text-white">서울시립대학교</span>
          <span className="body_2_16_r text-gray300">학과</span>
          <span className="body_2_16_m text-white">전자전기컴퓨터공학부</span>
          <span className="body_2_16_r text-gray300">생년월일</span>
          <span className="body_2_16_m text-white">99.06.07</span>
          <span className="body_2_16_r text-gray300">제출시간</span>
          <span className="body_2_16_m text-white">2025.01.01. 12:12:12</span>
        </div>

        <div className="flex flex-row gap-[3.2rem] px-[2.4rem] py-[2rem] rounded-[12px] bg-gray800">
          <div className="flex flex-col gap-[0.7rem] w-[32rem]">
            <div className="flex flex-row gap-[0.8rem]">
              <CheckBox size="lg" />
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
              <CheckBox size="lg" />
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

        <div className="custom-tab mt-[4rem]">
          <Tab
            selectedInitial="common"
            size="lg"
            style="secondary"
            tabItems={['common', 'part']}
            translator={{
              common: '공통 질문',
              part: '파트별 질문',
            }}
            onChange={handleTabChange}
            className=""
          />
        </div>

        <p className="my-[5.2rem] title_5_18_sb">질문 전 설명글을 넣어주세요</p>

        <ul className="flex flex-col gap-[5.2rem]">
          <QnaItem isFile={false} fileName="" fileUrl="" />
          <QnaItem isFile={false} fileName="" fileUrl="" />
          <QnaItem isFile={false} fileName="" fileUrl="" />
          <QnaItem isFile={false} fileName="" fileUrl="" />
        </ul>
      </div>
    </div>
  );
};

export default ApplicationDetail;
