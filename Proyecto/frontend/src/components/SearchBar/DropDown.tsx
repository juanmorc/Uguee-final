// components/CustomDropdown.tsx
import React, {useState} from "react";
import Select from "react-select";
import {cn} from "../../lib/utils.ts";

export type OptionType = {
    value: string;
    label: string;
};


type Props = {
    options: OptionType[],
    placeholder?: string,
    className?: string,
    onChange?: (option: OptionType | null) => void,
    value?: OptionType | null,
};




const Dropdown: React.FC<Props> = ({className, options, placeholder, onChange, value}) => {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(value || null);

    const handleChange = (option: OptionType | null) => {
        setSelectedOption(option);
        onChange?.(option);
    };

    const customStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: "0px",
            boxShadow: "none",
            cursor: "pointer",
            color: "red",
            borderRadius: "50px",
            "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none"
            },
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: "#f3e8ff", // slightly different amber shade
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused
                ? "#a5b4fc" // hover color
                : "transparent",
            color: "black",
            "&:active": {
                backgroundColor: "#FBBF24", // on click
            },
        }),
        singleValue: (base: any) => ({
            ...base,
            color: "black", // Selected Text
        }),
        input: (base: any) => ({
            ...base,
            color: "black", // Input text
        })
    };
    return (
        <div className={cn("w-max h-max")}>
            <Select
                options={options}
                onChange={handleChange}
                value={value || selectedOption}
                placeholder={placeholder}
                className={cn("text-sm", className)}
                styles={customStyles}
            />
        </div>
    );
};

export default Dropdown;
