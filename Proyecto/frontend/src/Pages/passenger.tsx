import NavHeader from "../components/NavHeader/NavHeader.tsx";
import SearchBarWithFilters, { type FilterState } from "../components/SearchBar/SearchBarWithFilters.tsx";
import { useNavigate } from "react-router-dom";
import { TripsSideBar } from "../components/SideBar/TripsSideBar.tsx";
import { HelmetIcon } from "../components/NavHeader/Icons.tsx";
import PassengerMap from "../components/Map/PassengerMap.tsx";
import type {Trip} from "../types/trip";
import { useState } from "react";
import './passenger.css'
import * as React from "react";

// Mock data for demonstration
const mockTrips = [
  {
    id: "1",
    departure: "Cámbulos",
    destination: "Mélendez",
    rating: 4.0,
    reviewCount: 5,
    departureDay: "Martes",
    departureHours: 9,
    departureMinutes: 0,
    vehicle: "Moto" as const,
    driverName: "Liseth Natalia",
  },
  {
    id: "2",
    departure: "Palmira",
    destination: "Cali",
    rating: 3.0,
    reviewCount: 9,
    departureDay: "Miércoles",
    departureHours: 15,
    departureMinutes: 30,
    vehicle: "Auto" as const,
    driverName: "Juan Moreno",
  },
  {
    id: "3",
    departure: "Univalle",
    destination: "Centro",
    rating: 4.5,
    reviewCount: 12,
    departureDay: "Lunes",
    departureHours: 7,
    departureMinutes: 30,
    vehicle: "Auto" as const,
    driverName: "María García",
  },
  {
    id: "4",
    departure: "Cali",
    destination: "Jamundí",
    rating: 4.2,
    reviewCount: 8,
    departureDay: "Viernes",
    departureHours: 18,
    departureMinutes: 0,
    vehicle: "Moto" as const,
    driverName: "Carlos Rodriguez",
  },
  {
    id: "5",
    departure: "Mélendez",
    destination: "Univalle",
    rating: 3.8,
    reviewCount: 15,
    departureDay: "Jueves",
    departureHours: 14,
    departureMinutes: 0,
    vehicle: "Auto" as const,
    driverName: "Ana López",
  },
  {
    id: "6",
    departure: "Versalles",
    destination: "Terminal",
    rating: 4.7,
    reviewCount: 22,
    departureDay: "Sábado",
    departureHours: 11,
    departureMinutes: 30,
    vehicle: "Auto" as const,
    driverName: "Roberto Silva",
  },
];

function Passenger() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [searchResults, setSearchResults] = useState<typeof mockTrips>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/driver");
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

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setLat(crd.latitude);
    setLong(crd.longitude);
  }

  function errors(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const handleRemoveTrip = (tripId: string) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  const handleSearch = (searchTerm: string, filters: FilterState) => {
    console.log("Searching for:", searchTerm, "with filters:", filters);

    // If search term is empty and no filters are set, don't show results
    if (!searchTerm.trim() && !filters.tripType && !filters.departureTime && !filters.vehicle) {
      setShowSearchResults(false);
      return;
    }

    // Filter trips based on search term and filters
    const filtered = mockTrips.filter(trip => {
      // Text search filter
      const matchesSearchTerm = !searchTerm.trim() || (
        trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Vehicle filter
      const matchesVehicle = !filters.vehicle ||
        trip.vehicle.toLowerCase() === filters.vehicle.value.toLowerCase();

      // Departure time filter (check if trip time contains A.M/P.M)
      const matchesTime = !filters.departureTime ||
        (filters.departureTime.value === "am" && trip.departureHours < 12||
        (filters.departureTime.value === "pm" && trip.departureHours >= 12));

      // Trip type filter (this would need to be mapped to trip data - for now we'll assume all trips match)
      const matchesTripType = !filters.tripType; // Since mockTrips don't have trip type field

      return matchesSearchTerm && matchesVehicle && matchesTime && matchesTripType;
    });

    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const handleAcceptSearchResult = (tripId: string) => {
    const acceptedTrips = mockTrips.filter(trip => trip.id == tripId);
    if (acceptedTrips && acceptedTrips.length > 0) {
      setTrips((prevTrips) => [...prevTrips, acceptedTrips[0]]);
      handleCloseSearchResults();
    }
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
  };

  // Close search results when clicking on the map
  const handleMapClick = () => {
    if (showSearchResults) {
      handleCloseSearchResults();
    }
  };

  return (
    <main className="flex h-full w-full flex-col">
      <NavHeader
        title={"Modo Pasajero"}
        icon={<HelmetIcon />}
        handleClick={handleClickLogo}
        driver={false}
      />
      <div className="flex-1 flex-col w-full h-full justify-center justify-items-center relative">
        <SearchBarWithFilters
          onSearch={handleSearch}
          searchResults={searchResults}
          showResults={showSearchResults}
          onAcceptTrip={handleAcceptSearchResult}
          onCloseResults={handleCloseSearchResults}
        />
        <div
          className="h-full w-full absolute top-0 left-0 z-0"
          onClick={handleMapClick}
        >
          <PassengerMap
            className={"h-full w-full"}
            latitude={latitude as unknown as number}
            longitude={longitude as unknown as number}
          />
        </div>
        <TripsSideBar trips={trips} onRemoveTrip={handleRemoveTrip} message={"Aún no te has unido a ningún viaje..."}/>
      </div>
    </main>
  );
}

export default Passenger;
