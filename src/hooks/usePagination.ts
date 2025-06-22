import { useState } from "react";

interface UsePaginationProps {
	totalItems: number;
	itemsPerPage?: number;
	initialPage?: number;
}

const usePagination = ({
	totalItems,
	itemsPerPage = 10,
	initialPage = 1,
}: UsePaginationProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return {
		currentPage,
		setCurrentPage,
		totalPages,
		handlePageChange,
	};
};

export default usePagination;
