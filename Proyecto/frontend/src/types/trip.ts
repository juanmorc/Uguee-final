export interface Trip {
    id: string;
    destination: string;
    departure: string;
    rating: number;
    reviewCount: number;
    departureDay: string;
    departureHours: number;
    departureMinutes: number;
    vehicle: string;
    driverName: string;
    departureCoordinates?: { lat: number; lng: number };
    destinationCoordinates?: { lat: number; lng: number };
}

export interface TripsSidebarProps {
    trips: Trip[];
    onRemoveTrip?: (tripId: string) => void; // Optional handler
    className?: string;
}

declare global {
    interface Window {
        confirmLocationSelection?: () => void;
    }
}
