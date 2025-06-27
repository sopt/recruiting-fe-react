import { Dialog } from '@sopt-makers/ui';

import { Button } from '@sopt-makers/ui';

interface BelowRateModalProps {
  onClose: () => void;
}

const BelowRateModal = ({ onClose }: BelowRateModalProps) => {
  return (
    <div className="flex flex-col gap-[2rem] w-[35.2rem] !mb-0">
      <span className="break-keep mb-[0.4rem]">
        지원서 항목 중 하나라도 그 항목의 최대 글자 수 기준에 미달한 지원자를
        숨깁니다.
      </span>
      <div className="p-[1.6rem] bg-gray700 rounded-[1.2rem] flex flex-col gap-[2.4rem]">
        <h3 className="title_5_18_sb text-white">
          입력된 % 적용시 최소 글자수
        </h3>
        <div className="flex gap-[7.2rem] px-[1.6rem] w-full justify-between flex-wrap">
          <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
            <p>-</p>
            <p>/</p>
            <p>500</p>
          </span>
          <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
            <p>-</p>
            <p>/</p>
            <p>500</p>
          </span>
          <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
            <p>-</p>
            <p>/</p>
            <p>500</p>
          </span>
          <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
            <p>-</p>
            <p>/</p>
            <p>500</p>
          </span>
          <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
            <p>-</p>
            <p>/</p>
            <p>500</p>
          </span>
        </div>
      </div>
      <Dialog.Footer align="right">
        <Button onClick={onClose}>확인</Button>
      </Dialog.Footer>
    </div>
  );
};

export default BelowRateModal;
