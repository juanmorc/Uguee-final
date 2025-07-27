import { useEffect } from "react";
import { useMap } from "react-leaflet";

type MapUpdaterProps = {
    latitude: number;
    longitude: number;
};

const MapUpdater: React.FC<MapUpdaterProps> = ({ latitude, longitude }) => {
    const map = useMap();

    useEffect(() => {
        map.setView([latitude, longitude], map.getZoom());
    }, [latitude, longitude, map]);

    return null;
};

export default MapUpdater;
