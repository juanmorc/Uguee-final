"use client";
import * as React from "react";

export function SearchInputField() {
    return (
        <div className={"flex flex-1 gap-2.5 items-center h-[71px] max-sm:h-[52px]"}>
            <input
                type="text"
                placeholder="Busca tu destino..."
                className={"flex-1 h-10 text-3xl leading-10 text-center text-zinc-700 max-md:text-3xl max-md:leading-9 max-sm:text-lg max-sm:leading-6 bg-transparent border-none outline-none placeholder:text-zinc-700"}
            />
        </div>
    );
}
