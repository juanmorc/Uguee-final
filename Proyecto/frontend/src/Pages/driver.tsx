import NavHeader from "../components/NavHeader/NavHeader.tsx";
import SearchBarWithFilters from "../components/SearchBar/SearchBarWithFilters.tsx";
import { TripsSideBar } from "../components/SideBar/TripsSideBar.tsx";
import { CarIcon } from "../components/NavHeader/Icons.tsx";
import AddRouteModal from "../components/AddRouteModal/AddRouteModal.tsx";
import FloatingActionButton from "../components/FloatingActionButton/FloatingActionButton.tsx";
import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import DriverMap from "../components/Map/DriverMap.tsx";
import type {Trip} from "../types/trip";


function Driver() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/passenger");
  };



  React.useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

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

  function success(pos : GeolocationPosition) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setLat(crd.latitude);
    setLong(crd.longitude);
  }

  function errors(err : GeolocationPositionError){
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
  };

  const handleSubmitRoute = (formData: Trip) => {
    // Here you would typically send the data to your backend
    console.log("New route submitted:", formData);
    const newTrip = {
      id: "1",
      departure: formData.departure,
      destination: formData.destination,
      rating: 0,
      reviewCount: 0,
      departureDay: formData.departureDay,
      departureHours: formData.departureHours,
      departureMinutes: formData.departureMinutes,
      vehicle: formData.vehicle,
      driverName: user.name + " " + user.lastName,
    }
    setTrips([...trips, newTrip]);
  };

  /*
  const handleLocationSelecting = (isSelecting: boolean, mode?: 'start' | 'destination') => {
    setIsSelectingLocation(isSelecting);
    if (mode) {
      setLocationSelectionMode(mode);
    }
  };
  */

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
        />
      </div>
    </main>
  );
}

export default Driver;
