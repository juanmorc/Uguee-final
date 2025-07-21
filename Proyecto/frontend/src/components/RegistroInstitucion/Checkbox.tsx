import React from "react";

interface CheckboxProps {
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-3 mt-4 text-base font-medium text-black leading-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 rounded border border-black accent-[#1A0023]"
      />
      <label className="text-sm text-black leading-tight">
        {label}
      </label>
    </div>
  );
};
