import { MOCK_GENERATION_DATA } from "@/constants/generation";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/layout/Components/Pagination";
import GenerationTable from "@/pages/PostGeneration/components/GenerationTable";
import { useMemo } from "react";

const PostGeneration = () => {
	const ITEMS_PER_PAGE = 10;

	const { currentPage, totalPages, handlePageChange } = usePagination({
		totalItems: MOCK_GENERATION_DATA.length,
		itemsPerPage: ITEMS_PER_PAGE,
	});

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;

		return MOCK_GENERATION_DATA.slice(startIndex, endIndex);
	}, [currentPage]);

	return (
		<div>
			<GenerationTable data={paginatedData} />
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default PostGeneration;
