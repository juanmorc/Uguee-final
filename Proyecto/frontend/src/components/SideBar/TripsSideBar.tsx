import { TripItem } from "./TripItem";
import type {TripsSidebarProps} from "../../types/trip";
import { cn } from "../../lib/utils.ts";
import {SideBarButton} from "./SideBarButton.tsx";
import {useState } from "react";
import {AtSign} from "lucide-react";


type Props = {
    message: string;
} & TripsSidebarProps;

export const TripsSideBar = ({
                                 message,
                                 trips,
                                 onRemoveTrip,
                                 className,
                             }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        <div className={cn("w-max top-0 left-0  h-full flex items-center justify-center absolute z-20 transition-all duration-350",
            isOpen ? "translate-x-0" : "-translate-x-full",
            className)}>
            <SideBarButton
                className={cn("absolute top-[50%] left-[95%] z-20")}
                size={"default"}
                onClick={toggleSidebar}
            />
            <div
                className={cn(
                    "w-max min-w-[200px] h-full flex-shrink-0",
                    "bg-purple-200 px-5 pt-7 pb-4 z-20",
                    "shadow-[0px_4px_6px_0px_#231538]",
                    "flex flex-col gap-5",
                    "transform transition-transform duration-300",
                    className
                )}
            >
                {/* Header */}
                <h2 className="text-4xl font-normal text-black leading-9">
                    Tus viajes
                </h2>

                {/* Purple line decoration */}
                <div className="w-full h-[2px] bg-[#8854D6]"/>

                {/* Trips list */}
                <div className="flex flex-col items-center w-max gap-2">
                    {trips.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>{message}</p>
                        </div>
                    ) : (
                    trips.map((trip, index) => (
                        <div key={trip.id} className="w-full">
                            <TripItem trip={trip} onRemove={onRemoveTrip} className="w-max"/>
                            {index < trips.length - 1 && (
                                <div className="w-[266px] h-px bg-black mx-auto"/>
                            )}
                        </div>
                    ))
                )}
                </div>
            </div>
        </div>
    );
};
