import NavHeader from "../components/NavHeader/NavHeader.tsx";
import SearchBarWithFilters from "../components/SearchBar/SearchBarWithFilters.tsx";
import { TripsSideBar } from "../components/SideBar/TripsSideBar.tsx";
import { CarIcon } from "../components/NavHeader/Icons.tsx";
import AddRouteModal from "../components/AddRouteModal/AddRouteModal.tsx";
import FloatingActionButton from "../components/FloatingActionButton/FloatingActionButton.tsx";
import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import DriverMap from "../components/Map/DriverMap.tsx";

// Mock data for demonstration
const mockTrips = [
  {
    id: "1",
    route: "Cámbulos - Mélendez",
    rating: 4.0,
    reviewCount: 5,
    departureDay: "Martes",
    departureTime: "9:00 am",
    vehicleType: "Moto" as const,
    driverName: "Liseth Natalia",
  },
  {
    id: "2",
    route: "Palmira - Cali",
    rating: 3.0,
    reviewCount: 9,
    departureDay: "Miércoles",
    departureTime: "5:00 am",
    vehicleType: "Auto" as const,
    driverName: "Juan Moreno",
  },
];

function Driver() {
  const [trips, setTrips] = useState([]);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [locationSelectionMode, setLocationSelectionMode] = useState<'start' | 'destination'>('start');

  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/passenger");
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state !== "denied") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setLat(crd.latitude);
    setLong(crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const handleRemoveTrip = (tripId: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSelectingLocation(false);
  };

  const handleSubmitRoute = (formData: any) => {
    // Here you would typically send the data to your backend
    console.log("New route submitted:", formData);
    // For now, we'll just log it
  };

  const handleLocationSelecting = (isSelecting: boolean, mode?: 'start' | 'destination') => {
    setIsSelectingLocation(isSelecting);
    if (mode) {
      setLocationSelectionMode(mode);
    }
  };

  const handleConfirmLocation = () => {
    // Call the globally exposed function from AddRouteModal
    if ((window as any).confirmLocationSelection) {
      (window as any).confirmLocationSelection();
    }
  };
  /*
  const handleFloatingButtonClick = () => {
    if (isSelectingLocation) {
      handleConfirmLocation();
    } else {
      handleOpenModal();
    }
  };
   */

  const handleFloatingButtonClick = () => {
      handleOpenModal();
  };

  return (
    <main className="bg-amber-200 h-full w-full flex flex-col">
      <NavHeader
        title={"Modo Conductor"}
        icon={<CarIcon />}
        handleClick={handleClickLogo}
        driver={true}
      />
      <div className="flex-1 flex-col w-full h-full justify-center justify-items-center relative">
        <SearchBarWithFilters />
        <DriverMap
          className={"h-full w-full absolute top-0 left-0 z-0"}
          latitude={latitude as unknown as number}
          longitude={longitude as unknown as number}
        />
        <TripsSideBar trips={trips} onRemoveTrip={handleRemoveTrip} message={"Aún no has creado ningún viaje..."}/>
        <FloatingActionButton
          onClick={handleFloatingButtonClick}
        />
        <AddRouteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitRoute}
          onLocationSelecting={handleLocationSelecting}
        />
      </div>
    </main>
  );
}

export default Driver;
