import * as React from "react";

interface ClockIconProps {
  className?: string;
}

export function ClockIcon({
  className = "w-7 h-7 flex-shrink-0 aspect-square max-sm:w-6 max-sm:h-6",
}: ClockIconProps) {
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
        d="M14.5 7.50001V14.5L19.1666 16.8333M26.1666 14.5C26.1666 20.9433 20.9433 26.1667 14.5 26.1667C8.05666 26.1667 2.83331 20.9433 2.83331 14.5C2.83331 8.05669 8.05666 2.83334 14.5 2.83334C20.9433 2.83334 26.1666 8.05669 26.1666 14.5Z"
        stroke="#BF77EE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
