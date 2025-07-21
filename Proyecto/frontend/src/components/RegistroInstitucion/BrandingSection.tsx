import React from "react";

export const BrandingSection: React.FC = () => {
  return (
    <section className="w-8/12 max-md:w-full bg-[#1A0023] flex flex-col items-center justify-center text-white py-16 px-4">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1
            className="text-5xl font-bold mt-0">Ugüee
        </h1>
        <p
            className="text-[30px] font-medium">Transporte Universitario
        </p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8f447919c4ecea19c2c1b0423647f75d1a98c0e?placeholderIfAbsent=true&apiKey=01dcf6f426444076b2f9a47c07ef69b8"
          alt="Transporte Universitario Logo"
          className="object-contain mt-16 w-[510px]"
        />
      </div>
    </section>
  );
};
