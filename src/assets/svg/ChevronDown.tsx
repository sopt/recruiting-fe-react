import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#808087"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m6 9 6 6 6-6"
    />
  </svg>
);
export default SvgChevronDown;
