import * as React from "react";
import { MenuIcon } from "./MenuIcon";

export function MenuButton() {
    return (
        <button className={"flex flex-col gap-2.5 justify-center items-center h-[79px] w-[66px] max-sm:w-12 max-sm:h-[60px]"}>
            <div className={"flex gap-2.5 justify-center items-center rounded-[100px]"}>
                <div className={"flex gap-2.5 justify-center items-center p-2 max-sm:p-1.5"}>
                    <MenuIcon className={"w-[35px] h-[35px] max-sm:w-[36px] max-sm:h-[36px]"}/>
                </div>
            </div>
        </button>
    );
}
