import { Ellipse, FileDownload } from '@/assets/svg';
import { TextArea } from '@sopt-makers/ui';

interface QnaItemProps {
  isFile: boolean;
  fileName?: string;
  fileUrl?: string;
}

const QnaItem = ({ isFile, fileName = '', fileUrl = '' }: QnaItemProps) => {
  return (
    <li className="flex flex-col gap-[0.8rem]">
      <p className="title_5_18_sb text-white">
        1. 지원자님이 생각하는 공유의 가치가 무엇인지, 지식 또는 경험을
        공유하거나 공유받았던 경험을 토대로 서술해 주세요. (700자){' '}
        <span className="inline-block align-middle translate-y-[-2px]">
          <Ellipse width={8} />
        </span>
      </p>
      {isFile && (
        <a
          href={fileUrl}
          download
          className="flex justify-between py-[1.1rem] px-[2.2rem] w-full rounded-2xl bg-gray800"
        >
          {fileName ? (
            <>
              <span className="body_2_16_m text-gray-10">{fileName}</span>
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
      <TextArea maxLength={700} value="" />
    </li>
  );
};

export default QnaItem;
