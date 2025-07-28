import React from "react";

const ChevronDownIcon: React.FC = () => {
    return (
        <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="chevron-down"
            style={{
                width: "16px",
                height: "16px",
                position: "relative"
            }}
            aria-hidden="true"
        >
            <path
                d="M4 6.5L8 10.5L12 6.5"
                stroke="#1E1E1E"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ChevronDownIcon;
