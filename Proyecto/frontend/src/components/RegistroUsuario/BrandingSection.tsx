//import * as React from "react";

export function BrandingSection() {
  return (
    <section className="flex flex-col justify-start items-start p-14 w-[512px] max-md:p-10 pl-17 max-md:w-full max-sm:p-5">
      <header
          className="mb-4 mt-[-10px] text-6xl font-bold text-red-700 leading-[64px] max-md:text-5xl max-md:leading-[56px] max-sm:mb-3 max-sm:text-4xl max-sm:leading-10"
          style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
      >
        <span className="text-black">U</span>
        <span className="text-red-700">güee</span>
      </header>
        <h2
            className="text-[40px] mt-[25px] font-roboto font-bold text-center text-[#000000] leading-[45px] w-[450px]"
            style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
            Una plataforma<br/>
            para el Transporte<br/>
            Universitario
        </h2>
        <img
            src="https://images.seeklogo.com/logo-png/17/3/universidad-del-valle-logo-png_seeklogo-177396.png"
            alt="Logo Univalle"
            className="absolute w-[150px] h-auto mb-2"
            style={{width: '270px', top: '310px', left: '142px'}}
        />
    </section>
  );
}
