//import * as React from "react";
import { BrandingSection } from "../components/RegistroUsuario/BrandingSection.tsx";
import { RegistrationForm } from "../components/RegistroUsuario/RegistrationForm.tsx";

function RegistrationPage() {
  return (
    <main className="flex flex-col w-full h-full max-md:flex-col">
        <div className="bg-white flex grow gap-5 flex-row">
      <BrandingSection />
      <RegistrationForm />
        </div>
    </main>
  );
}

export default RegistrationPage;
