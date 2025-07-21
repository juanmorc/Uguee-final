//import * as React from "react";
import { BrandingSection } from "./BrandingSection";
import { RegistrationForm } from "./RegistrationForm";

function RegistrationPage() {
  return (
    <main className="flex w-full bg-white min-h-[screen] max-md:flex-col">
      <BrandingSection />
      <RegistrationForm />
    </main>
  );
}

export default RegistrationPage;
