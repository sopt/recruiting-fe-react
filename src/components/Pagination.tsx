import { Pagnation } from '@/assets/svg';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const VISIBLE_PAGE_COUNT = 5;

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  let startPage =
    Math.floor((currentPage - 1) / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT + 1;
  const endPage = Math.min(totalPages, startPage + VISIBLE_PAGE_COUNT - 1);

  if (endPage - startPage + 1 < VISIBLE_PAGE_COUNT) {
    startPage = Math.max(1, endPage - VISIBLE_PAGE_COUNT + 1);
  }

  const pageButtons = [1];
  for (let i = startPage + 1; i <= endPage; i++) {
    pageButtons.push(i);
  }

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <nav className="flex mt-[5.6rem] mb-[5.6rem] justify-center items-center gap-[1.2rem] pl-[21.2rem]">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed mr-[1.2rem]"
      >
        <Pagnation className="rotate-180 w-[4rem] h-[4rem]" />
      </button>
      {pageButtons.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`${page === currentPage ? 'text-black bg-gray10' : 'text-gray200'} flex w-[4rem] h-[4rem] items-center justify-center rounded-[2rem] heading_6_18_b hover:text-white transition-all duration-200 cursor-pointer`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ml-[1.2rem]"
      >
        <Pagnation className="w-[4rem] h-[4rem]" />
      </button>
    </nav>
  );
};

export default Pagination;
