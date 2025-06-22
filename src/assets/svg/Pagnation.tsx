import type { SVGProps } from "react";
const SvgPagnation = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 40 40"
		{...props}
	>
		<path
			stroke="#9D9DA4"
			strokeLinecap="round"
			strokeWidth={2.5}
			d="m17 26 5.293-5.293a1 1 0 0 0 0-1.414L17 14"
		/>
	</svg>
);
export default SvgPagnation;
