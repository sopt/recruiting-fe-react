import { Ellipse, FileDownload } from '@/assets/svg';
import type { QuestionType } from '@/pages/ApplicationDetail/types';
import { TextArea } from '@sopt-makers/ui';
import { useEffect } from 'react';

const QnaItem = ({
  questionOrder,
  content,
  charLimit,
  isFile,
  answer,
  required,
  orderOffset,
}: QuestionType & { orderOffset: number }) => {
  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas) {
      for (const textarea of textareas) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [answer]);

  return (
    <li className="flex flex-col gap-[0.8rem]">
      <p className="title_5_18_sb text-white">
        {`${questionOrder + orderOffset}. ${content}`}
        {charLimit !== null && ` (${charLimit}자)`}
        {required && (
          <span className="inline-block align-middle translate-y-[-2px] translate-x-[3px]">
            <Ellipse width={8} />
          </span>
        )}
      </p>
      {isFile && (
        <a
          href={answer?.fileUrl ?? ''}
          download
          className="flex justify-between py-[1.1rem] px-[2.2rem] w-full rounded-2xl bg-gray800"
        >
          {answer?.fileName ? (
            <>
              <span className="body_2_16_m text-gray-10">
                {answer.fileName}
              </span>
              <FileDownload width={25} />
            </>
          ) : (
            <>
              <span className="body_2_16_m text-gray500">
                업로드된 파일이 없어요.
              </span>
              <FileDownload width={25} className="opacity-[0.3]" />
            </>
          )}
        </a>
      )}
      {answer?.answer !== null && (
        <TextArea
          maxLength={charLimit}
          value={answer?.answer}
          disabled
          className="custom-detail-textArea"
        />
      )}
    </li>
  );
};

export default QnaItem;
