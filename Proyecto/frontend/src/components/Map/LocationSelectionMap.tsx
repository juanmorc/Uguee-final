import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import * as L from "leaflet";

interface LocationSelectionMapProps {
  className?: string;
  initialLatitude?: number;
  initialLongitude?: number;
  onLocationChange?: (lat: number, lng: number) => void;
}

const LocationSelectionMap: React.FC<LocationSelectionMapProps> = ({
  className,
  initialLatitude = 3.3516,
  initialLongitude = -76.5320, // Default to Cali, Colombia
  onLocationChange,
}) => {
  const [pin, setPin] = useState<{ lat: number; lng: number }>({
    lat: initialLatitude,
    lng: initialLongitude,
  });

  const popupRef = useRef(null);

  useEffect(() => {
    if (initialLatitude !== 0 && initialLongitude !== 0) {
      setPin({ lat: initialLatitude, lng: initialLongitude });
    }
  }, [initialLatitude, initialLongitude]);

  const handleMarkerDragEnd = (e: any) => {
    const { lat, lng } = e.target.getLatLng();
    setPin({ lat, lng });

    // Call the callback function to update parent component
    if (onLocationChange) {
      onLocationChange(lat, lng);
    }

    // Open popup to show coordinates
    if (popupRef.current) {
      popupRef.current.openPopup();
    }
  };

  return (
    <MapContainer
      center={[pin.lat, pin.lng]}
      zoom={15}
      scrollWheelZoom={true}
      className={cn("z-0", className)}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[pin.lat, pin.lng]}
        draggable={true}
        ref={popupRef}
        eventHandlers={{
          dragend: handleMarkerDragEnd,
        }}
      >
        <Popup>
          Ubicación seleccionada:<br />
          <b>Lat:</b> {pin.lat.toFixed(4)}<br />
          <b>Lng:</b> {pin.lng.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationSelectionMap;
