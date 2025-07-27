import * as React from "react";
import Dropdown from "./DropDown.tsx";
import type { OptionType } from "./DropDown.tsx";

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  options: OptionType[];
  onChange?: (option: OptionType | null) => void;
  value?: OptionType | null;
}

export function FilterButton({
  icon,
  label,
  className = "",
  options,
  onChange,
  value,
}: FilterButtonProps) {
  return (
      <div className={"flex h-max px-1 items-center w-max pl-2 gap-2.5 rounded-full bg-purple-200 hover:bg-purple-300 max-sm:h-6"}>
        {icon}
        <Dropdown
          className={"text-lg font-normal leading-8 max-lg:text-xl max-sm:text-lg max-sm:w-auto max-sm:h-6 max-sm:leading-6"}
          placeholder={label}
          options={options}
          onChange={onChange}
          value={value}
        >
        </Dropdown>
      </div>
  );
}
