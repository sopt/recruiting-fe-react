import { useState } from 'react';

interface UsePaginationProps {
  totalItems: number;
  limit?: number;
  initialPage?: number;
}

const usePagination = ({
  totalItems,
  limit = 10,
  initialPage = 1,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;
