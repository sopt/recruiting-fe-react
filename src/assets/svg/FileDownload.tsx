import type { SVGProps } from 'react';
const SvgFileDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.73 2.543v4.13c0 .56 0 .84.11 1.055a1 1 0 0 0 .437.437c.213.109.493.109 1.054.109h4.13m-10.73 7 3 3m0 0 3-3m-3 3v-6m2-10h-5.2c-1.68 0-2.52 0-3.163.326a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327h6.4c1.68 0 2.52 0 3.162-.326a3 3 0 0 0 1.312-1.312c.326-.641.326-1.481.326-3.162v-9.2z"
    />
  </svg>
);
export default SvgFileDownload;
