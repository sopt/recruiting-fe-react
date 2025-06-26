import type { SVGProps } from 'react';
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M7.122 16.473a7.083 7.083 0 0 0 9.012-10.015l-.208-.36m-12.06 7.444a7.083 7.083 0 0 1 9.012-10.014m-10.8 10.084 2.276.61.61-2.277m10.071-3.89.61-2.276 2.277.61"
    />
  </svg>
);
export default SvgRefresh;
