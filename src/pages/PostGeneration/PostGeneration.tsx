import { MOCK_GENERATION_DATA } from "@/constants/generation";
import GenerationTable from "@/pages/PostGeneration/components/GenerationTable";

const PostGeneration = () => {
	return (
		<div>
			<GenerationTable data={MOCK_GENERATION_DATA} />
		</div>
	);
};

export default PostGeneration;
