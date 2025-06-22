import { Trash } from '@/assets/svg';

interface Period {
  start: string;
  end: string;
}

interface GenerationTableProps {
  data: {
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
                    <button type="button" className="cursor-pointer">
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
