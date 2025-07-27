import React, { useState } from "react";
import "./AddRouteModal.css";
import LocationSelectionMap from "../Map/LocationSelectionMap";

interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: RouteFormData) => void;
  onLocationSelecting?: (isSelecting: boolean, mode?: 'start' | 'destination') => void;
  onConfirmLocation?: () => void;
}

interface RouteFormData {
  departure: string;
  destination: string;
  vehicle: string;
  hours: string;
  minutes: string;
  departureCoordinates?: { lat: number; lng: number };
  destinationCoordinates?: { lat: number; lng: number };
}

const AddRouteModal: React.FC<AddRouteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onLocationSelecting,
  onConfirmLocation,
}) => {
  const [formData, setFormData] = useState<RouteFormData>({
    departure: "",
    destination: "",
    vehicle: "",
    hours: "",
    minutes: "",
  });

  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'start' | 'destination'>('start');
  const [tempCoordinates, setTempCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 3.3516,
    lng: -76.5320
  });

  // Get user's current location on component mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTempCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Could not get current location:', error);
          // Keep default coordinates (Cali, Colombia)
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    }
  }, []);

  const handleInputChange = (field: keyof RouteFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSelectingLocation) {
      onClose();
    }
  };

  const handleLocationButtonClick = (mode: 'start' | 'destination') => {
    setSelectionMode(mode);
    setIsSelectingLocation(true);

    // Set initial coordinates based on existing data or current location
    const existingCoords = mode === 'start'
      ? formData.departureCoordinates
      : formData.destinationCoordinates;

    if (existingCoords) {
      setTempCoordinates(existingCoords);
    }

    // Notify parent component
    if (onLocationSelecting) {
      onLocationSelecting(true, mode);
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setTempCoordinates({ lat, lng });
  };

  const handleConfirmLocation = () => {
    const coordinatesField = selectionMode === 'start' ? 'departureCoordinates' : 'destinationCoordinates';
    const locationField = selectionMode === 'start' ? 'departure' : 'destination';

    const locationText = `Lat: ${tempCoordinates.lat.toFixed(4)}, Lng: ${tempCoordinates.lng.toFixed(4)}`;

    setFormData((prev) => ({
      ...prev,
      [coordinatesField]: tempCoordinates,
      [locationField]: locationText,
    }));

    setIsSelectingLocation(false);

    // Notify parent component
    if (onLocationSelecting) {
      onLocationSelecting(false);
    }
  };

  // Expose the handleConfirmLocation function via callback
  React.useEffect(() => {
    if (onConfirmLocation && isSelectingLocation) {
      // Store the function globally for the FloatingActionButton to access
      (window as any).confirmLocationSelection = handleConfirmLocation;
    }
    return () => {
      if ((window as any).confirmLocationSelection) {
        delete (window as any).confirmLocationSelection;
      }
    };
  }, [isSelectingLocation, tempCoordinates, selectionMode, onConfirmLocation]);

  const handleCancelLocationSelection = () => {
    setIsSelectingLocation(false);

    // Notify parent component
    if (onLocationSelecting) {
      onLocationSelecting(false);
    }
  };

  if (!isOpen) return null;

  if (isSelectingLocation) {
    return (
      <div className="modal-overlay map-selection-overlay" onClick={handleOverlayClick}>
        <div className="map-selection-container">
          <div className="map-selection-header">
            <h3 className="map-selection-title">
              Selecciona {selectionMode === 'start' ? 'punto de salida' : 'destino'}
            </h3>
            <button className="cancel-selection-button" onClick={handleCancelLocationSelection}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="map-selection-content">
            <LocationSelectionMap
              className="location-selection-map"
              initialLatitude={tempCoordinates.lat}
              initialLongitude={tempCoordinates.lng}
              onLocationChange={handleLocationChange}
            />
          </div>
          <div className="map-selection-instructions">
            <p>Arrastra el marcador a la ubicación deseada</p>
            <p>Coordenadas: {tempCoordinates.lat.toFixed(6)}, {tempCoordinates.lng.toFixed(6)}</p>
          </div>
          <button
          className="floating-action-button confirm-mode"
          onClick={handleConfirmLocation}
          title="Confirmar"
        >
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="38" height="38" fill="#EDE5FF" fillOpacity="0.0" />
            <path
              d="M28.5 9.5L9.5 28.5M9.5 9.5L28.5 28.5"
              stroke="#757575"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="modal-header">
            <div className="header-background"></div>
            <div className="header-content">
              <div className="icon-circle">
                <svg
                  width="67"
                  height="67"
                  viewBox="0 0 67 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.3333 55C23.7056 55 21.456 54.0644 19.5847 52.1931C17.7134 50.3218 16.7778 48.0722 16.7778 45.4444V25.9153C15.3843 25.3977 14.2396 24.5317 13.3438 23.3174C12.4479 22.103 12 20.7194 12 19.1667C12 17.1759 12.6968 15.4838 14.0903 14.0903C15.4838 12.6968 17.1759 12 19.1667 12C21.1574 12 22.8495 12.6968 24.2431 14.0903C25.6366 15.4838 26.3333 17.1759 26.3333 19.1667C26.3333 20.7194 25.8854 22.103 24.9896 23.3174C24.0938 24.5317 22.9491 25.3977 21.5556 25.9153V45.4444C21.5556 46.7583 22.0234 47.8831 22.959 48.8187C23.8947 49.7544 25.0194 50.2222 26.3333 50.2222C27.6472 50.2222 28.772 49.7544 29.7076 48.8187C30.6433 47.8831 31.1111 46.7583 31.1111 45.4444V21.5556C31.1111 18.9278 32.0468 16.6782 33.9181 14.8069C35.7894 12.9356 38.0389 12 40.6667 12C43.2944 12 45.544 12.9356 47.4153 14.8069C49.2866 16.6782 50.2222 18.9278 50.2222 21.5556V41.0847C51.6157 41.6023 52.7604 42.4683 53.6562 43.6826C54.5521 44.897 55 46.2806 55 47.8333C55 49.8241 54.3032 51.5162 52.9097 52.9097C51.5162 54.3032 49.8241 55 47.8333 55C45.8426 55 44.1505 54.3032 42.7569 52.9097C41.3634 51.5162 40.6667 49.8241 40.6667 47.8333C40.6667 46.2806 41.1146 44.887 42.0104 43.6528C42.9062 42.4185 44.0509 41.5625 45.4444 41.0847V21.5556C45.4444 20.2417 44.9766 19.1169 44.041 18.1813C43.1053 17.2456 41.9806 16.7778 40.6667 16.7778C39.3528 16.7778 38.228 17.2456 37.2924 18.1813C36.3567 19.1169 35.8889 20.2417 35.8889 21.5556V45.4444C35.8889 48.0722 34.9532 50.3218 33.0819 52.1931C31.2106 54.0644 28.9611 55 26.3333 55ZM19.1667 21.5556C19.8435 21.5556 20.4109 21.3266 20.8687 20.8687C21.3266 20.4109 21.5556 19.8435 21.5556 19.1667C21.5556 18.4898 21.3266 17.9225 20.8687 17.4646C20.4109 17.0067 19.8435 16.7778 19.1667 16.7778C18.4898 16.7778 17.9225 17.0067 17.4646 17.4646C17.0067 17.9225 16.7778 18.4898 16.7778 19.1667C16.7778 19.8435 17.0067 20.4109 17.4646 20.8687C17.9225 21.3266 18.4898 21.5556 19.1667 21.5556ZM47.8333 50.2222C48.5102 50.2222 49.0775 49.9933 49.5354 49.5354C49.9933 49.0775 50.2222 48.5102 50.2222 47.8333C50.2222 47.1565 49.9933 46.5891 49.5354 46.1312C49.0775 45.6734 48.5102 45.4444 47.8333 45.4444C47.1565 45.4444 46.5891 45.6734 46.1312 46.1312C45.6734 46.5891 45.4444 47.1565 45.4444 47.8333C45.4444 48.5102 45.6734 49.0775 46.1312 49.5354C46.5891 49.9933 47.1565 50.2222 47.8333 50.2222Z"
                    fill="#602CAD"
                  />
                </svg>
              </div>
              <div className="header-title">Nueva ruta</div>
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content">
            {/* Departure Field */}
            <div className="form-field">
              <label className="field-label">Salida:</label>
              <div className="input-container">
                <input
                  type="text"
                  className="location-input"
                  placeholder="Ingresa ubicación..."
                  value={formData.departure}
                  onChange={(e) =>
                    handleInputChange("departure", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="map-pin-button"
                  onClick={() => handleLocationButtonClick('start')}
                  title="Seleccionar en mapa"
                >
                  <svg
                    className="map-pin-icon"
                    width="33"
                    height="43"
                    viewBox="0 0 33 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.5 18.3182C30.5 29.4545 16.5 39 16.5 39C16.5 39 2.5 29.4545 2.5 18.3182C2.5 14.5208 3.975 10.8789 6.6005 8.1937C9.22601 5.50852 12.787 4 16.5 4C20.213 4 23.774 5.50852 26.3995 8.1937C29.025 10.8789 30.5 14.5208 30.5 18.3182Z"
                      stroke="#A8A8A8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 23.0909C19.0773 23.0909 21.1667 20.9541 21.1667 18.3182C21.1667 15.6823 19.0773 13.5455 16.5 13.5455C13.9227 13.5455 11.8333 15.6823 11.8333 18.3182C11.8333 20.9541 13.9227 23.0909 16.5 23.0909Z"
                      stroke="#A8A8A8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Destination Field */}
            <div className="form-field">
              <label className="field-label">Destino:</label>
              <div className="input-container">
                <input
                  type="text"
                  className="location-input"
                  placeholder="Ingresa ubicación..."
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="map-pin-button"
                  onClick={() => handleLocationButtonClick('destination')}
                  title="Seleccionar en mapa"
                >
                  <svg
                    className="map-pin-icon"
                    width="33"
                    height="44"
                    viewBox="0 0 33 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.5 18.8182C30.5 29.9545 16.5 39.5 16.5 39.5C16.5 39.5 2.5 29.9545 2.5 18.8182C2.5 15.0208 3.975 11.3789 6.6005 8.6937C9.22601 6.00852 12.787 4.5 16.5 4.5C20.213 4.5 23.774 6.00852 26.3995 8.6937C29.025 11.3789 30.5 15.0208 30.5 18.8182Z"
                      stroke="#A8A8A8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 23.5909C19.0773 23.5909 21.1667 21.4541 21.1667 18.8182C21.1667 16.1823 19.0773 14.0455 16.5 14.0455C13.9227 14.0455 11.8333 16.1823 11.8333 18.8182C11.8333 21.4541 13.9227 23.5909 16.5 23.5909Z"
                      stroke="#A8A8A8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Vehicle Field */}
            <div className="form-field">
              <label className="field-label">Vehiculo:</label>
              <div className="vehicle-container">
                <select
                  className="vehicle-select"
                  value={formData.vehicle}
                  onChange={(e) => handleInputChange("vehicle", e.target.value)}
                >
                  <option value="">Selecciona tu vehiculo</option>
                  <option value="Moto">Moto</option>
                  <option value="Auto">Auto</option>
                  <option value="Camioneta">Camioneta</option>
                </select>
              </div>
            </div>

            {/* Time Field */}
            <div className="form-field">
              <label className="field-label">Hora de salida:</label>
              <div className="time-container">
                <input
                  type="text"
                  className="time-input"
                  placeholder="HH"
                  maxLength={2}
                  value={formData.hours}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (parseInt(value) <= 23 || value === "") {
                      handleInputChange("hours", value);
                    }
                  }}
                />
                <span className="time-separator">:</span>
                <input
                  type="text"
                  className="time-input"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.minutes}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (parseInt(value) <= 59 || value === "") {
                      handleInputChange("minutes", value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </form>
        <button
            className="new-route-button"
            onClick={handleSubmit}
            title="Enviar Nueva Ruta"
        >
          <label className="button-label">Crear Ruta</label>
        </button>
      </div>
    </div>
  );
};

export default AddRouteModal;
