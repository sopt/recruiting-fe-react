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
	const headerBaseClasses =
		"p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600";
	const cellBaseClasses =
		"h-[6rem] p-[2.1rem] text-center text-white body_3_14_m bg-transparent border-b-[1px] border-gray700";

	return (
		<table>
			<thead>
				<tr>
					<th
						className={`w-[11rem] ${headerBaseClasses} rounded-tl-[1rem] border-r-[1px] `}
					>
						기수
					</th>
					<th className={`w-[11rem] ${headerBaseClasses}`}>이름</th>
					<th className={`w-[31.5rem] ${headerBaseClasses}`}>서류 지원 기간</th>
					<th className={`w-[31.5rem] ${headerBaseClasses}`}>
						서류 결과 확인 기간
					</th>
					<th className={`w-[31.5rem] ${headerBaseClasses}`}>
						최종 결과 확인 기간
					</th>
					<th className={`w-[5rem] ${headerBaseClasses} rounded-tr-[1rem]`} />
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index} className="hover:bg-gray900">
						<td className={`${cellBaseClasses} border-r-[1px]`}>
							{item.generation}
						</td>
						<td className={`${cellBaseClasses} border-r-[1px]`}>{item.name}</td>
						<td className={`${cellBaseClasses} border-r-[1px]`}>
							<div className="flex justify-evenly items-center gap-[0.5rem]">
								<p>{item.applicationPeriod.start}</p>
								<p>~</p>
								<p>{item.applicationPeriod.end}</p>
							</div>
						</td>
						<td className={`${cellBaseClasses} border-r-[1px]`}>
							<div className="flex justify-evenly items-center gap-[0.5rem]">
								<p>{item.applicationResultPeriod.start}</p>
								<p>~</p>
								<p>{item.applicationResultPeriod.end}</p>
							</div>
						</td>
						<td className={`${cellBaseClasses} border-r-[1px]`}>
							<div className="flex justify-evenly items-center gap-[0.5rem]">
								<p>{item.finalResultPeriod.start}</p>
								<p>~</p>
								<p>{item.finalResultPeriod.end}</p>
							</div>
						</td>
						<td className={cellBaseClasses}>
							<div className="flex justify-center items-center">
								<button type="button" className="cursor-pointer">
									<Trash width={22} />
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
