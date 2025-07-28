import * as React from "react";
import { cn } from "../../lib/utils.ts";

export interface SidebarButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg";
}

const SideBarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    // Base styles matching the Figma design
                    "relative flex items-center justify-end pr-1",
                    "rounded-[25px] transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:pointer-events-none disabled:opacity-50",
                    // Background and shadow matching the design
                    "bg-[rgba(217,198,255,0.95)] hover:bg-[rgba(217,198,255,1)]",
                    "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
                    "hover:shadow-[0px_6px_8px_0px_rgba(0,0,0,0.3)]",
                    // Size variants
                    {
                        "w-10 h-26": size === "default",
                        "w-12 h-20": size === "sm",
                        "w-20 h-36": size === "lg",
                    },
                    className,
                )}
                ref={ref}
                {...props}
            >
                {/* Arrow icon matching the Figma design */}
                <svg
                    width="12"
                    height="22"
                    viewBox="0 0 12 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-5 fill-[var(--M3-sys-dark-primary-container)]"
                >
                    <path
                        d="M0.833344 21.4166V0.583313L11.25 11L0.833344 21.4166Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        );
    },
);

SideBarButton.displayName = "SideBarButton";

export { SideBarButton };