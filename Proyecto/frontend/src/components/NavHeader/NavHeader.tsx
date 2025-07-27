"use client";
import * as React from "react";
import ChevronDownIcon from "./ChevronDownIcon.tsx";
import {cn} from "../../lib/utils.ts";
import { motion, AnimatePresence } from 'framer-motion';
import {useNavigate} from "react-router-dom";
import { useUser } from "../../UserContext";

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
    driver: boolean;
};

type UserProfileProps = {
    driver: boolean
};



const NavHeader: React.FC<NavHeaderProps> = ({className, title, icon, handleClick, driver}) => {

    return (
        <header className={cn("nav-header", className)} >
            <LogoSection title={title} icon={icon} handleClick={handleClick}/>
            <NavigationLinks />
            <UserProfile driver={driver}/>
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

const UserProfile: React.FC<UserProfileProps> = ({driver = false}) => {
    const { user } = useUser();
    const [isOpen, setOpen] = React.useState(false);
    const navigate = useNavigate();
    return (
        <div className={"flex has-[:hover]:bg-gray-300 relative gap-4 items-center px-6 py-4 rounded-lg max-md:gap-3 max-md:px-4 max-md:py-3 max-sm:gap-2 max-sm:px-3 max-sm:py-2"}>
            <div className={"flex relative justify-center items-center w-10 h-10 rounded-full max-sm:w-8 max-sm:h-8"}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a9e1b825206ffc7d9a2857cba54bfc541a2cf1f?placeholderIfAbsent=true"
                    alt="User avatar"
                    className={'shrink-0 w-10 h-10 rounded-full max-sm:w-8 max-sm:h-8'}
                />
            </div>
            <button className="flex items-center hover:bg-gray-400 transition-colors"
            onClick={() => setOpen(!isOpen)}>
                <ChevronDownIcon/>
            </button>
            <AnimatePresence>
            {isOpen &&(
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute flex flex-col items-center z-30 gap-3
                    top-full w-max h-max right-0 rounded-lg bg-gray-200 p-2 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="menu-header-text">{"¡Hola, " + user.name + " " + user.lastName + "!"}</p>
                    {driver &&(
                        <>
                        <div className="w-full h-[2px] bg-purple-900 opacity-40"/>
                        <button className="flex items-center rounded-lg w-full p-2 hover:bg-purple-200 transition-colors"
                                onClick={() => navigate("/vehicle")}>
                        Registrar Nuevo Vehículo
                    </button>
                        </>
                    )}
                    <button className="flex items-center justify-center rounded-lg w-full p-2 hover:bg-red-100 transition-colors"
                            onClick={() => navigate("/")}>
                        Cerrar Sesión
                    </button>
                </motion.div>
            )}
            </AnimatePresence>
        </div>

    );
};

export default NavHeader;
