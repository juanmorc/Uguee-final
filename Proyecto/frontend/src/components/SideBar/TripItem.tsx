import { X } from "lucide-react";
import { StarRating } from "./StarRating";
import type {Trip} from "../../types/trip";
import { cn } from "../../lib/utils.ts";

interface TripItemProps {
    trip: Trip;
    onRemove?: (tripId: string) => void;
    className?: string;
}

export const TripItem = ({ trip, onRemove, className }: TripItemProps) => {
    return (
        <div className={cn("flex flex-col items-start px-[22px] py-4", className)}>
            {/* Route name */}
            <h3 className="text-2xl font-normal text-[#602CAD] leading-9 mb-1">
                {trip.route}
            </h3>

            {/* Star rating */}
            <StarRating
                rating={trip.rating}
                reviewCount={trip.reviewCount}
                className="mb-3"
            />

            {/* Trip details and remove button */}
            <div className="flex justify-between items-center w-full">
                {/* Trip info */}
                <div className="flex flex-col justify-center">
                    <div className="text-base text-[#2C2C2C] leading-9">
                        Salida: {trip.departureDay} {trip.departureTime}
                    </div>
                    <div className="text-base text-[#2C2C2C] leading-9">
                        {trip.vehicleType} -{" "}
                        <span className="underline">{trip.driverName}</span>
                    </div>
                </div>

                {/* Remove button */}
                <button
                    className="w-[30px] h-[30px] hover:bg-red-50"
                    onClick={() => onRemove?.(trip.id)}
                >
                    <X className="w-7 h-6 text-[#EA4335] stroke-[4]" />
                </button>
            </div>
        </div>
    );
};