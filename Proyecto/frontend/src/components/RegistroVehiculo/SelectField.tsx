import React from "react";

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
                                                            label,
                                                            value,
                                                            onChange,
                                                            className = "",
                                                        }) => {
    return (
        <div className={`flex flex-col gap-1 items-start w-full ${className}`}>
            <label className="w-full text-[18px] font-roboto leading-5 text-black">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full px-3 py-[6px] text-[15px] text-gray-700 bg-white border border-red-700 rounded-[8px] outline-none focus:ring-2 focus:ring-red-400"
            >
                <option value="" disabled>Seleccionar</option>
                <option value="Pasajero">Pasajero</option>
                <option value="Conductor">Conductor</option>
            </select>
        </div>
    );
};
