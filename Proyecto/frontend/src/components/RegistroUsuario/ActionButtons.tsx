"use client";
import React from "react";

export const ActionButtons: React.FC = () => {
    const baseStyle: React.CSSProperties = {
        width: "165px",
        height: "50px",
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "Roboto",
        borderRadius: "8px",
        border: "2px solid #B91C1C",
        backgroundColor: "white",
        color: "#B91C1C",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    };

    const hoverStyle: React.CSSProperties = {
        backgroundColor: "#B91C1C",
        color: "white",
    };

    const [hoverFirst, setHoverFirst] = React.useState(false);
    const [hoverSecond, setHoverSecond] = React.useState(false);

    return (
        <div className="w-full flex justify-center items-center gap-8 mt-6 max-sm:flex-col max-sm:gap-4 max-sm:mt-5">
            <button
                style={{
                    ...baseStyle,
                    ...(hoverFirst ? hoverStyle : {}),
                }}
                onMouseEnter={() => setHoverFirst(true)}
                onMouseLeave={() => setHoverFirst(false)}
            >
                Registrarme
            </button>

            <button
                style={{
                    ...baseStyle,
                    ...(hoverSecond ? hoverStyle : {}),
                }}
                onMouseEnter={() => setHoverSecond(true)}
                onMouseLeave={() => setHoverSecond(false)}
            >
                Ya tengo cuenta
            </button>
        </div>
    );
};
