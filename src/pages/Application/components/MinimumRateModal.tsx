import type { QuestionCharLimit } from '@/pages/Application/\btypes';
import { Dialog } from '@sopt-makers/ui';
import { Button } from '@sopt-makers/ui';

interface MinimumRateModalProps {
  minimumRate: number;
  questions: QuestionCharLimit[];
  onClose: () => void;
}

const MinimumRateModal = ({
  minimumRate,
  questions,
  onClose,
}: MinimumRateModalProps) => {
  return (
    <div className="flex flex-col gap-[2rem] w-[35.2rem]">
      <span className="break-keep mb-[0.4rem]">
        지원서에서 절반 이상의 답변이 글자 수 기준에 미달한 경우, 해당 지원자는
        숨겨집니다.
      </span>
      <div className="p-[1.6rem] bg-gray700 rounded-[1.2rem] flex flex-col gap-[2.4rem]">
        <h3 className="title_5_18_sb text-white">
          입력된 {minimumRate > 0 ? `${minimumRate}` : ''}% 적용시 최소 글자수
        </h3>
        <div className="grid grid-cols-2 w-full gap-[1.2rem] px-[1.6rem] justify-items-center">
          {questions.map((question) => (
            <div
              key={question.questionId}
              className="flex body_2_16_r w-[10.8rem] justify-between text-gray10 [&>*:last-child]:text-gray100"
            >
              <span>{minimumRate === 0 ? '-' : question.charLimitLength}</span>
              <span>/</span>
              <span>{question.charLimit}</span>
            </div>
          ))}
        </div>
      </div>
      <Dialog.Footer align="right">
        <Button onClick={onClose}>확인</Button>
      </Dialog.Footer>
    </div>
  );
};

export default MinimumRateModal;
