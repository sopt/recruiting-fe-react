import { Trash } from "@/assets/svg";

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

const GenerationTable = ({ data }: GenerationTableProps) => {
	const headerBaseStyle =
		"p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600";
	const cellBaseStyle =
		"h-[6rem] text-center text-white body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle";

	return (
		<table className="table-fixed">
			<thead>
				<tr>
					<th
						className={`w-[11rem] rounded-tl-[1rem] border-r-[1px] border-gray600 ${headerBaseStyle}`}
					>
						기수
					</th>
					<th
						className={`w-[11rem] border-r-[1px] border-gray600 ${headerBaseStyle}`}
					>
						이름
					</th>
					<th
						className={`w-[31.5rem] border-r-[1px] border-gray600 ${headerBaseStyle}`}
					>
						서류 지원 기간
					</th>
					<th
						className={`w-[31.5rem] border-r-[1px] border-gray600 ${headerBaseStyle}`}
					>
						서류 결과 확인 기간
					</th>
					<th
						className={`w-[31.5rem] border-r-[1px] border-gray600 ${headerBaseStyle}`}
					>
						최종 결과 확인 기간
					</th>
					<th className={`w-[5rem] rounded-tr-[1rem] ${headerBaseStyle}`} />
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr
						key={index}
						className="hover:bg-gray900 transition-colors duration-300"
					>
						<td className={`${cellBaseStyle} border-r-[1px]`}>
							<div className="h-full flex items-center justify-center">
								{item.generation}
							</div>
						</td>
						<td className={`${cellBaseStyle} border-r-[1px]`}>
							<div className="h-full flex items-center justify-center">
								{item.name}
							</div>
						</td>
						<td className={`${cellBaseStyle} border-r-[1px]`}>
							<div className="h-full flex items-center justify-evenly gap-[0.5rem]">
								<p>{item.applicationPeriod.start}</p>
								<p>~</p>
								<p>{item.applicationPeriod.end}</p>
							</div>
						</td>
						<td className={`${cellBaseStyle} border-r-[1px]`}>
							<div className="h-full flex items-center justify-evenly gap-[0.5rem]">
								<p>{item.applicationResultPeriod.start}</p>
								<p>~</p>
								<p>{item.applicationResultPeriod.end}</p>
							</div>
						</td>
						<td className={`${cellBaseStyle} border-r-[1px]`}>
							<div className="h-full flex items-center justify-evenly gap-[0.5rem]">
								<p>{item.finalResultPeriod.start}</p>
								<p>~</p>
								<p>{item.finalResultPeriod.end}</p>
							</div>
						</td>
						<td className={cellBaseStyle}>
							<div className="h-full flex items-center justify-center">
								<button type="button" className="cursor-pointer">
									<Trash width={22} className="stroke-white" />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default GenerationTable;

// Mock data 추가
export const mockGenerationData = [
	{
		generation: "2025",
		name: "AT SOPT",
		applicationPeriod: {
			start: "2024.12.01",
			end: "2024.12.31",
		},
		applicationResultPeriod: {
			start: "2025.01.15",
			end: "2025.01.20",
		},
		finalResultPeriod: {
			start: "2025.02.01",
			end: "2025.02.05",
		},
	},
	{
		generation: "2024",
		name: "AT SOPT",
		applicationPeriod: {
			start: "2023.12.01",
			end: "2023.12.31",
		},
		applicationResultPeriod: {
			start: "2024.01.15",
			end: "2024.01.20",
		},
		finalResultPeriod: {
			start: "2024.02.01",
			end: "2024.02.05",
		},
	},
	{
		generation: "2023",
		name: "AT SOPT",
		applicationPeriod: {
			start: "2022.12.01",
			end: "2022.12.31",
		},
		applicationResultPeriod: {
			start: "2023.01.15",
			end: "2023.01.20",
		},
		finalResultPeriod: {
			start: "2023.02.01",
			end: "2023.02.05",
		},
	},
];
