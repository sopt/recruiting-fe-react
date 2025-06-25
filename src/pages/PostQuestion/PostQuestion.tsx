import QuestionBox from '@/pages/PostQuestion/components/QuestionBox';
import { Add } from '@/assets/svg';
import DescriptionBox from '@/pages/Question/components/DescriptionBox';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';
import Header from '@/pages/Question/components/Header';

const PostQuestion = () => {
  const [hasDescription, setHasDescription] = useState(false);

  const handleHasDescriptionChange = (bool: boolean) => {
    setHasDescription(bool);
  };

  return (
    <main className="max-w-[98rem]">
      <Header />
      <div className="flex justify-between items-end mb-[2rem]">
        <span className="title_6_16_sb text-gray200">총 2개</span>
        <div className="flex gap-[1.6rem]">
          <Button variant="outlined" size="md">
            임시저장
          </Button>
          <Button variant="fill" size="md">
            최종 등록하기
          </Button>
        </div>
      </div>

      {hasDescription ? (
        <DescriptionBox onHasDescriptionChange={handleHasDescriptionChange} />
      ) : (
        <button
          type="button"
          onClick={() => handleHasDescriptionChange(true)}
          className="flex flex-row gap-[0.4rem] mb-[3.2rem] px-[2rem] py-[1.2rem] rounded-[10px] bg-gray700 label_2_16_sb cursor-pointer"
        >
          <Add width={20} />
          설명글 추가하기
        </button>
      )}

      <QuestionBox />
    </main>
  );
};

export default PostQuestion;
