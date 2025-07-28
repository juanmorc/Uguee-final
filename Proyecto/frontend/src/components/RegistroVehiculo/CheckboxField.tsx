import React from "react";

interface CheckboxFieldProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: React.ReactNode;
    className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
                                                                checked,
                                                                onChange,
                                                                label = (
                                                                    <>
                                                                        Acepto los{" "}
                                                                        <a href="https://docs.google.com/document/d/19LGX6SUW1j8t-hQjKCmhL5-PN0g12Mg68sVJXEOAmzo/edit?usp=sharing">
                                                                            <span className="underline font-medium">términos y condiciones</span>
                                                                        </a> del servicio
                                                                    </>
                                                                ),
                                                                className = "",
                                                            }) => {
    return (
        <div className={`w-full mt-2 ${className}`}>
            <label className="flex items-start space-x-2 text-[13px] text-black">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mt-[2px] w-[16px] h-[16px] border border-red-700 rounded-[3px] accent-red-700"
                />
                <span>{label}</span>
            </label>
        </div>
    );
};
