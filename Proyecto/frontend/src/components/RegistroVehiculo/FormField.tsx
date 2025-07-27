import React from "react";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
                                                      label,
                                                      value,
                                                      onChange,
                                                      placeholder = "",
                                                      type = "text",
                                                      optional = false,
                                                      className = "",
                                                    }) => {
  return (
      <div className={`flex flex-col items-start w-full space-y-1 ${className}`}>
        <label className="w-full text-[18px] font-roboto leading-5 text-black">
          {label} {optional && <span className="text-zinc-400">(opcional)</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-[6px] text-[15px] text-gray-800 placeholder-gray-400 rounded-[8px] border border-red-700 outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
  );
};
