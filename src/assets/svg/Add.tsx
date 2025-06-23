import type { SVGProps } from 'react';
const SvgAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#9D9DA4"
      strokeLinecap="round"
      d="M2.602 8.273h11M8.102 13.773v-11"
    />
  </svg>
);
export default SvgAdd;
