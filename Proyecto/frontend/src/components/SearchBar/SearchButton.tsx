import * as React from "react";
import { SearchIcon } from "./SearchIcon";

export function SearchButton() {
    return (
        <button className={"flex justify-end items-center w-12 h-[57px] max-sm:w-10 max-sm:h-12"}>
            <div className={"flex flex-col gap-2.5 justify-center items-center w-12 h-12 flex-[shrink] max-sm:w-10 max-sm:h-10"}>
                <div className={"flex gap-2.5 justify-center items-center rounded-[100px]"}>
                    <div className={"flex gap-2.5 justify-center items-center p-2 max-sm:p-1.5"}>
                        <SearchIcon className={"w-[20px] h-[20px] max-sm:w-[20px] max-sm:h-[20px]"}/>
                    </div>
                </div>
            </div>
        </button>
    );
}
