import type { SVGProps } from 'react';
const SvgAlertTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#F77234"
      fillRule="evenodd"
      d="M9.054 1.773a1.22 1.22 0 0 0-2.108 0L.82 12.343a1.215 1.215 0 0 0 1.055 1.823h12.249c.934 0 1.525-1.01 1.054-1.823zM8 5.417c.322 0 .583.262.583.584v2.666a.583.583 0 1 1-1.166 0V6.001c0-.322.26-.584.583-.584m-.583 5.917c0-.322.26-.583.583-.583h.007a.583.583 0 0 1 0 1.167H8a.583.583 0 0 1-.583-.584"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgAlertTriangle;
