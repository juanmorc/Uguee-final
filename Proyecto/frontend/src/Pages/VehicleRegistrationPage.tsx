//import * as React from "react";
import { BrandingSection } from "../components/RegistroVehiculo/BrandingSection.tsx";
import { RegistrationForm } from "../components/RegistroVehiculo/RegistrationForm.tsx";

function VehicleRegistrationPage() {
  return (
    <main className="flex flex-col w-max h-max max-md:flex-col">
        <div className="bg-white w-full h-full flex grow gap-5 flex-row">
      <BrandingSection />
      <RegistrationForm />
        </div>
    </main>
  );
}

export default VehicleRegistrationPage;
