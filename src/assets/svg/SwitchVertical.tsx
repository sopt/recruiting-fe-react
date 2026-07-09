import type { SVGProps } from 'react';

const SvgSwitchVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#808087"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M14.167 3.334v13.333m3.333-3.334-3.333 3.334-3.334-3.334m-5 3.334V3.334m3.334 3.333L5.833 3.334 2.5 6.667"
    />
  </svg>
);
export default SvgSwitchVertical;
