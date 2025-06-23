import type { SVGProps } from 'react';
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="current"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.472 12.243-.943.943a3.333 3.333 0 0 1-4.714-4.714l.943-.943m8.485.943.943-.943a3.333 3.333 0 1 0-4.714-4.714l-.943.942m-1.862 6.577 4.667-4.667"
    />
  </svg>
);
export default SvgLink;
