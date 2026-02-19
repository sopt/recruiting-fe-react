import { Pagnation } from '@/assets/svg';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const VISIBLE_PAGE_COUNT = 5;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const safeTotalPages = Math.max(0, totalPages);
  if (safeTotalPages <= 1) return null;

  const safeCurrentPage = clamp(currentPage, 1, safeTotalPages);

  const groupIndex = Math.floor((safeCurrentPage - 1) / VISIBLE_PAGE_COUNT);
  const startPage = groupIndex * VISIBLE_PAGE_COUNT + 1;
  const endPage = Math.min(safeTotalPages, startPage + VISIBLE_PAGE_COUNT - 1);

  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  const hasPrevPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < safeTotalPages;

  const handleChange = (nextPage: number) => {
    const clamped = clamp(nextPage, 1, safeTotalPages);
    if (clamped !== safeCurrentPage) onPageChange(clamped);
  };

  return (
    <nav className="flex mt-[5.6rem] mb-[5.6rem] justify-center items-center gap-[1.2rem] pl-[21.2rem]">
      <button
        type="button"
        onClick={() => handleChange(safeCurrentPage - 1)}
        disabled={!hasPrevPage}
        className="disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed mr-[1.2rem]"
        aria-label="Previous page"
      >
        <Pagnation className="rotate-180 w-[4rem] h-[4rem]" />
      </button>

      {pageButtons.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handleChange(page)}
          aria-current={page === safeCurrentPage ? 'page' : undefined}
          className={`${
            page === safeCurrentPage ? 'text-black bg-gray10' : 'text-gray200'
          } flex w-[4rem] h-[4rem] items-center justify-center rounded-[2rem] heading_6_18_b hover:text-white transition-all duration-200 cursor-pointer`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => handleChange(safeCurrentPage + 1)}
        disabled={!hasNextPage}
        className="disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ml-[1.2rem]"
        aria-label="Next page"
      >
        <Pagnation className="w-[4rem] h-[4rem]" />
      </button>
    </nav>
  );
};

export default Pagination;