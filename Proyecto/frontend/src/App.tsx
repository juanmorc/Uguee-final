import Passenger from './Pages/passenger.tsx';
import Driver from './Pages/driver.tsx';
import { Route, Routes} from "react-router-dom";
import './App.css'
import RegistrationPage from "./Pages/RegistrationPage.tsx";
import VehicleRegistrationPage from "./Pages/VehicleRegistrationPage.tsx";
import RegistroInstituciones from "./Pages/RegistroInstituciones.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/institution" element={<RegistroInstituciones/>} />
            <Route path="/passenger" element={<Passenger/>} />
            <Route path="/driver" element={<Driver />} />
            <Route path={"/vehicle"} element={<VehicleRegistrationPage/>} />
        </Routes>
    );

}

export default App
