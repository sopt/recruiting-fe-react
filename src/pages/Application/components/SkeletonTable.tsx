import { Skeleton } from '@sopt-makers/ui';

const CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle justify-center border-r-[1px]';
const TD_CONTENT_STYLE =
  'w-full text-center break-words p-[0.8rem] flex gap-[0.5rem] justify-center items-center [&>span]:!rounded-[0.6rem]';

const SkeletonTable = () => {
  return (
    <tr>
      <td className={`${CELL_BASE_STYLE} w-[11rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={68} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[11rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={68} height={35} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[14rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={52} height={70} />
          <Skeleton width={37} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[11rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={68} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[16.8rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={20} height={20} />
          <Skeleton width={116} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[16.8rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={20} height={20} />
          <Skeleton width={116} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[11rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={68} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[14rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={140} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[14rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={120} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[14rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={120} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[16.8rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={120} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[14rem]`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={120} height={20} />
        </div>
      </td>
      <td className={`${CELL_BASE_STYLE} w-[16.8rem] !border-r-0`}>
        <div className={`${TD_CONTENT_STYLE}`}>
          <Skeleton width={120} height={20} />
        </div>
      </td>
    </tr>
  );
};

export default SkeletonTable;
