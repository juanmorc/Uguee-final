import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';
import * as React from "react";
import { cn } from "../../lib/utils.ts";
import MapUpdater from "./MapUpdater";
import { useState } from "react";
import { useEffect, useRef } from "react";

type MapProps = {
    className?: string;
    latitude: number;
    longitude: number;
};

const PassengerMap: React.FC<MapProps> = ({ className, latitude, longitude}) => {
    const standingGuy = L.icon({
        iconUrl: '/dude.png', // URL or path to your custom icon image
        iconSize: [32, 32], // Size of the icon in pixels [width, height]
        iconAnchor: [16, 32], // Point of the icon corresponding to the marker's location [x, y]
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
        // Optional: shadowUrl, shadowSize, shadowAnchor for a shadow image
    });
    const [pin, setPin] = useState<{ lat: number; lng: number }>({
        lat: latitude,
        lng: longitude,
    });
    useEffect(() => {
        if (latitude !== 0 && longitude !== 0) {
            setPin({ lat: latitude, lng: longitude });
        }
    }, [latitude, longitude]);


    const popupRef = useRef(null);
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={true} className={cn("z-0", className)}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[pin.lat, pin.lng]}
                icon={standingGuy}
            >
                <Popup ref={popupRef}>
                        Aquí estás!
                </Popup>
            </Marker>
            <MapUpdater latitude={latitude} longitude={longitude} />
        </MapContainer>
    );
};

export default PassengerMap;