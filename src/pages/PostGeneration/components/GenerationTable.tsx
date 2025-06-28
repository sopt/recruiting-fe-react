import { Trash } from '@/assets/svg';
import { Button, Dialog, DialogContext } from '@sopt-makers/ui';
import { useContext } from 'react';

interface Period {
  start: string;
  end: string;
}

interface GenerationTableProps {
  data: {
    id: number;
    generation: string;
    name: string;
    applicationPeriod: Period;
    applicationResultPeriod: Period;
    finalResultPeriod: Period;
  }[];
}

const HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';

const GenerationTable = ({ data }: GenerationTableProps) => {
  const { openDialog, closeDialog } = useContext(DialogContext);

  const handleDeleteGeneration = () => {
    // TODO: 실제 삭제 로직 구현 (id 사용)
    closeDialog();
  };

  const openDeleteModal = (generationId: number) => {
    openDialog({
      title: '기수를 삭제하실 건가요?',
      description: (
        <div className="mb-[2rem] flex flex-col mt-[1.2rem] gap-[3.6rem]">
          <p className="whitespace-pre-line">
            {
              '기수를 삭제하면 해당 기수의 모든 지원서가 삭제됩니다.\n삭제하시겠습니까?'
            }
          </p>
          <Dialog.Footer align="right">
            <Button theme="black" onClick={closeDialog}>
              취소하기
            </Button>
            {/* TODO: 삭제 id 전달 */}
            <Button theme="red" onClick={() => handleDeleteGeneration()}>
              삭제하기
            </Button>
          </Dialog.Footer>
        </div>
      ),
    });
  };

  return (
    <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide pr-[12.4rem]">
      <table className="w-[122.5rem]">
        <thead>
          <tr>
            <th
              className={`w-[11rem] rounded-tl-[1rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              기수
            </th>
            <th
              className={`w-[11rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              이름
            </th>
            <th
              className={`w-[31.5rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              서류 지원 기간
            </th>
            <th
              className={`w-[31.5rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              서류 결과 확인 기간
            </th>
            <th
              className={`w-[31.5rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              최종 결과 확인 기간
            </th>
            <th className={`w-[5rem] rounded-tr-[1rem] ${HEADER_BASE_STYLE}`} />
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className={`${CELL_BASE_STYLE} text-gray200`}>
                기수를 추가하세요.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray900 transition-colors duration-300"
              >
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.generation}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.name}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-evenly gap-[0.5rem]">
                    <p>{item.applicationPeriod.start}</p>
                    <p>~</p>
                    <p>{item.applicationPeriod.end}</p>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-evenly gap-[0.5rem]">
                    <p>{item.applicationResultPeriod.start}</p>
                    <p>~</p>
                    <p>{item.applicationResultPeriod.end}</p>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-evenly gap-[0.5rem]">
                    <p>{item.finalResultPeriod.start}</p>
                    <p>~</p>
                    <p>{item.finalResultPeriod.end}</p>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE}`}>
                  <div className="h-full flex items-center justify-center">
                    <button
                      type="button"
                      className="cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      <Trash width={22} className="stroke-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenerationTable;
