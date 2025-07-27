import * as React from "react";

interface ChevronIconProps {
  className?: string;
}

export function ChevronIcon({
  className = "w-7 h-7 flex-shrink-0 max-sm:w-6 max-sm:h-6",
}: ChevronIconProps) {
  return (
    <svg
      width="31"
      height="29"
      viewBox="0 0 31 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M13 20.75V8.25L19.25 14.5L13 20.75Z" fill="#4F378B" />
    </svg>
  );
}
