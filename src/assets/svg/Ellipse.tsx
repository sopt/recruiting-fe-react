import * as React from 'react';
import type { SVGProps } from 'react';
const SvgEllipse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 9 9"
    {...props}
  >
    <ellipse cx={4.31} cy={4.5} fill="#F77234" rx={4.051} ry={4} />
  </svg>
);
export default SvgEllipse;
