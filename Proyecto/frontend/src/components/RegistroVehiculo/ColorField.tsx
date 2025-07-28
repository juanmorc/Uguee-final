import React, {useEffect, useRef, useState} from "react";
import { HexColorPicker } from "react-colorful";
import './ColorField.css'

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: ((newColor: string) => void);
  color: string;
  type?: string;
  optional?: boolean;
  className?: string;
}


export const ColorField: React.FC<ColorFieldProps> = ({
                                                      label,
                                                      optional = false,
                                                      className = "",
                                                      onChange,
                                                      color = "#aabbcc"
                                                    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  return (
      <div className={`flex flex-col items-start w-full space-y-1 ${className}`}>
        <label className="w-full text-[18px] font-roboto leading-5 text-black">
          {label} {optional && <span className="text-zinc-400">(opcional)</span>}
        </label>
          <div className="flex flex-col w-full p-5 items-stretch rounded-[8px] border border-red-700 outline-none focus:ring-2 focus:ring-red-400">
              <div className="relative inline-block" ref={pickerRef}>
                  <button
                      className="w-25 h-7 rounded-sm border border-gray-300 shadow"
                      style={{ backgroundColor: color }}
                      onClick={() => setIsOpen((prev) => !prev)}
                      aria-label="Pick a color"
                      type="button"
                  />
                  {isOpen && (
              <div className="small">
                <HexColorPicker color={color} onChange={onChange}  />
              </div>
                      )}
          </div>
      </div>
      </div>
  );
};
