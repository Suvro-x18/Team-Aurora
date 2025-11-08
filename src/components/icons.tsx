import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 21C12 16.5817 12 12.1634 12 7.74512"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.9502 16.25C9.55034 17.5 10.6997 18.5 12 18.5C13.3003 18.5 14.4497 17.5 15.0498 16.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.5 11.5C17.5 11.1667 19 10.5 19 8.5C19 6.5 17.5 4.5 15.5 4.5C13.5 4.5 12 6.5 12 8.5C12 10.5 13.5 11.1667 14.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.5 11.5C6.5 11.1667 5 10.5 5 8.5C5 6.5 6.5 4.5 8.5 4.5C10.5 4.5 12 6.5 12 8.5C12 10.5 10.5 11.1667 9.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 4.5C16.5 3.5 17.5 2 20 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.5 4.5C7.5 3.5 6.5 2 4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
