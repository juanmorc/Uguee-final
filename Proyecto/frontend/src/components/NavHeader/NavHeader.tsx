"use client";
import * as React from "react";
import ChevronDownIcon from "./ChevronDownIcon.tsx";
import {cn} from "../../lib/utils.ts";

type LogoProps = {
    className?: string;
    title: string;
    icon: React.ReactElement;
    handleClick: () => void;
};

type NavHeaderProps = {
    className?: string;
    title: string;
    icon: React.ReactElement;
    handleClick: () => void;
};

const NavHeader: React.FC<NavHeaderProps> = ({className, title, icon, handleClick}) => {
    return (
        <header className={cn("nav-header", className)} >
            <LogoSection title={title} icon={icon} handleClick={handleClick}/>
            <NavigationLinks />
            <UserProfile />
        </header>
    );
};


const LogoSection: React.FC<LogoProps> = ({className, title, icon, handleClick}) => {
    return (
        <section className={cn("logo-section", className)} onClick={handleClick}>
            <LogoCircle />
            <h1 className="header-text">
                {title}
            </h1>
            <div>
                {icon}
            </div>
        </section>
    );
};

const LogoCircle: React.FC = () => {
    return (
        <div className="logo-text">
            Ü
        </div>
    );
};

const NavigationLinks: React.FC = () => {
    return (
        <nav className="header-box">
            <a href="https://www.instagram.com/sangre_en_azulejo?igsh=YjR3aG95bXY5eHQ3" className="header-link">
                Contacto
            </a>
            <a href="https://github.com/juanmorc/Uguee-final/tree/main" className="header-link">
                Configuración
            </a>
        </nav>
    );
};

const UserProfile: React.FC = () => {
    return (
        <div className={"flex has-[:hover]:bg-gray-300 relative gap-4 items-center px-6 py-4 rounded-lg max-md:gap-3 max-md:px-4 max-md:py-3 max-sm:gap-2 max-sm:px-3 max-sm:py-2"}>
            <div className={"flex relative justify-center items-center w-10 h-10 rounded-full max-sm:w-8 max-sm:h-8"}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a9e1b825206ffc7d9a2857cba54bfc541a2cf1f?placeholderIfAbsent=true"
                    alt="User avatar"
                    className={'shrink-0 w-10 h-10 rounded-full max-sm:w-8 max-sm:h-8'}
                />
            </div>
            <button className="flex items-center hover:bg-gray-400 transition-colors">
                <ChevronDownIcon/>
            </button>
        </div>
    );
};

export default NavHeader;
