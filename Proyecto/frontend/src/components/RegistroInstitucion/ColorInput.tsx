import React from "react";

interface ColorInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                      }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-[16px] font-roboto font-bold text-black leading-5">{label}</label>
            <input
                type="text"
                className="w-30 px-3 py-[6px] rounded-[8px] border border-black text-zinc-700 outline-none focus:ring-2 focus:ring-purple-700"
                value={value}
                onChange={onChange}
                placeholder={`Ej: ${label}`}
            />
        </div>
    );
};