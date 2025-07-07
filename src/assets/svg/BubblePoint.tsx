import * as React from "react";
import type { SVGProps } from "react";
const SvgBubblePoint = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 12 9"
    {...props}
  >
    <path fill="#3F3F47" d="M6 0 .804 9h10.392z" />
  </svg>
);
export default SvgBubblePoint;
