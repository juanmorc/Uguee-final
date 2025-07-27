export interface Trip {
    id: string;
    route: string;
    rating: number;
    reviewCount: number;
    departureDay: string;
    departureTime: string;
    vehicleType: "Moto" | "Auto";
    driverName: string;
}

export interface TripsSidebarProps {
    trips: Trip[];
    onRemoveTrip?: (tripId: string) => void; // Optional handler
    className?: string;
}
