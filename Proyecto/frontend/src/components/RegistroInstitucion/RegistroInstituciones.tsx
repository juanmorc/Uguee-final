//import React from "react";
import { BrandingSection } from "./BrandingSection";
import { RegistrationForm } from "./RegistrationForm";

function RegistroInstituciones() {
  return (
    <main className="overflow-hidden pr-20 bg-white max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <BrandingSection />
        <RegistrationForm />
      </div>
    </main>
  );
}

export default RegistroInstituciones;
