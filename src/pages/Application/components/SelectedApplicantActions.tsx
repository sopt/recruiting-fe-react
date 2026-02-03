import { Button } from '@sopt-makers/ui';
import { goApplicationDetail } from '@/pages/Application/utils';

const SelectedApplicantActions = ({
  checkedApplicantList,
}: {
  checkedApplicantList: number[];
}) => {
  return (
    <>
      <span className="text-gray200 title_6_16_sb">|</span>
      <div className="flex gap-[1.3rem] items-center">
        <span className="text-gray200 title_6_16_sb ml-[0.2rem]">
          {checkedApplicantList.length}건 선택
        </span>
        <Button
          theme="black"
          size="sm"
          onClick={() => {
            checkedApplicantList.forEach((id) => {
              goApplicationDetail(id);
            });
          }}
          disabled={checkedApplicantList.length === 0}
        >
          새 창 열기
        </Button>
      </div>
    </>
  );
};

export default SelectedApplicantActions;
