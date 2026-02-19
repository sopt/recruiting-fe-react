import { Button } from '@sopt-makers/ui';
import type { Group } from '@/pages/PostQuestion/types';

interface ApplyHeaderProps {
  season: number;
  group: Group;
}

const ApplyHeader = ({ season, group }: ApplyHeaderProps) => {
  return (
    <header className="flex items-center justify-center gap-[21.1rem] pt-[16.3rem] pb-[8.3rem]">
      <h1 className="heading_1.5_40_b text-gray900">{`${season}기 ${group} 지원서`}</h1>
      <div className="flex gap-[1.6rem]">
        <Button
          theme="white"
          size="md"
          disabled={true}
          className="disabled:!bg-gray50 disabled:!text-white w-[12.6rem]"
        >
          임시저장
        </Button>
        <Button
          disabled={true}
          size="md"
          className="px-[!3.2rem] disabled:!bg-gray50 disabled:!text-white w-[12.6rem]"
        >
          제출하기
        </Button>
      </div>
    </header>
  );
};

ApplyHeader.displayName = 'ApplyHeader';

export default ApplyHeader;
