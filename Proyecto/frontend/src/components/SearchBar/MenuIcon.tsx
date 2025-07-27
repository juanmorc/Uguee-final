import * as React from "react";

interface MenuIconProps {
    className?: string;
}

export function MenuIcon({ className }: MenuIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 60 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M19 45V40H53V45H19ZM19 32.5V27.5H53V32.5H19ZM19 20V15H53V20H19Z"
                fill="#1D1B20"
            />
        </svg>
    );
}
