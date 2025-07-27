import React, {useEffect, useRef, useState} from "react";
import { DayPicker } from 'react-day-picker';
import { format, isValid, parse } from "date-fns";
import 'react-day-picker/dist/style.css';

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  className?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
                                                      label,
                                                      value,
                                                      onChange,
                                                      placeholder = "",
                                                      type = "text",
                                                      optional = false,
                                                      className = "",
                                                    }) => {
    // Hold the month in state to control the calendar when the input changes
    const [month, setMonth] = useState(new Date());
    const pickerRef = useRef<HTMLDivElement>(null);
    const [onFocus, setFocus] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setFocus(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            onChange(format(date, "dd/MM/yyyy"));
        }

    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange(inputValue);

        const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
        } else {
            setSelectedDate(undefined);
        }
    };

    return (
        <div className={`flex flex-col items-start w-full space-y-1 ${className}`}
        ref={pickerRef}>
            <label className="w-full text-[18px] font-roboto leading-5 text-black">
                {label} {optional && <span className="text-zinc-400">(opcional)</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                onFocus={() => setFocus((prev) => !prev)}
                className="w-full px-3 py-[6px] text-[15px] text-gray-800 placeholder-gray-400 rounded-[8px] border border-red-700 outline-none focus:ring-2 focus:ring-red-400"
            />
            {(onFocus &&
            <DayPicker
                month={month}
                onMonthChange={setMonth}
                mode="single"
                selected={selectedDate}
                onSelect={handleDayPickerSelect}
            />
            )}
        </div>
    );
};