"use client";
import * as React from "react";
import { MenuButton } from "./MenuButton";
import { SearchInputField } from "./SearchInputField";
import { SearchButton } from "./SearchButton";

export function SearchInput() {
    return (
        <section className={"flex gap-1 items-center px-4 mx-auto w-full bg-white rounded-3xl h-[60px] max-w-2/3 max-md:max-w-[calc(100%-32px)] max-sm:rounded-3xl max-sm:h-[60px]"}>
            <div className={"flex flex-1 gap-1 items-center p-1"}>
                <MenuButton />
                <SearchInputField />
                <SearchButton />
            </div>
        </section>
    );
}

export default SearchInput;
