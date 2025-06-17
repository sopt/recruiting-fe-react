
import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="currentColor"
      d="M13.032 1.573a1.103 1.103 0 0 1 1.56 0l3.835 3.832a1.104 1.104 0 0 1 0 1.56l-2.511 2.512-5.394-5.394zM9.638 4.967 2.45 12.155c-.197.197-.311.46-.322.737l-.871 4.679a.4.4 0 0 0-.007.076 1.103 1.103 0 0 0 1.103 1.103.4.4 0 0 0 .076-.007l4.68-.871c.276-.01.54-.126.736-.322l7.187-7.19z"
    />
  </svg>
);
export default SvgEdit;
