import type { SVGProps } from 'react';

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 17 17"
		{...props}
	>
		<path
			stroke="current"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="m3.268 7.567 3.556 3.6 7.11-6"
		/>
	</svg>
);
export default SvgCheck;
