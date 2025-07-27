import * as React from "react";

interface BriefcaseIconProps {
  className?: string;
}

export function BriefcaseIcon({
  className = "w-7 h-7 aspect-square max-sm:w-6 max-sm:h-6",
}: BriefcaseIconProps) {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.1667 25V6.33333C19.1667 5.71449 18.9208 5.121 18.4833 4.68342C18.0457 4.24583 17.4522 4 16.8333 4H12.1667C11.5478 4 10.9543 4.24583 10.5168 4.68342C10.0792 5.121 9.83334 5.71449 9.83334 6.33333V25M5.16668 8.66667H23.8333C25.122 8.66667 26.1667 9.71134 26.1667 11V22.6667C26.1667 23.9553 25.122 25 23.8333 25H5.16668C3.87801 25 2.83334 23.9553 2.83334 22.6667V11C2.83334 9.71134 3.87801 8.66667 5.16668 8.66667Z"
        stroke="#BF77EE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
