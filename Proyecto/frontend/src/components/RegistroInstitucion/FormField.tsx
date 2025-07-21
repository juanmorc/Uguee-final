import React from "react";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                      label,
                                                      value,
                                                      onChange,
                                                      placeholder = "",
                                                      className = "",
                                                    }) => {
  return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="w-full text-[16px] font-roboto font-bold text-black leading-5">{label}</label>
        <input
            type="text"
            className="w-full text-[15px] px-3 py-[7px] rounded-[8px] border border-black text-zinc-700 outline-none focus:ring-2 focus:ring-purple-700"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
      </div>
  );
};
