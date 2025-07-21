"use client";
import React, { useState } from "react";
import { FormField } from "./FormField";
import { ColorInput } from "./ColorInput";
import { Checkbox } from "./Checkbox";

export const RegistrationForm: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
  const [direccion, setDireccion] = useState("");
  const [logo, setLogo] = useState("");
  const [colors, setColors] = useState<string[]>([""]);
  const addColor = () => {
    if (colors.length < 4) {
      setColors([...colors, ""]);
    }
  };
  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
  };
  const removeColor = (index: number) => {
    if (colors.length > 1) {
      const updatedColors = [...colors];
      updatedColors.splice(index, 1);
      setColors(updatedColors);
    }
  };
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nombre,
      calle: direccion,
      logo,
      //colors,
      //acceptedTerms,
    };

    console.log("Datos enviados:", data);
    try {
      const response = await fetch("http://localhost:8000/instituciones/instituciones/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al registrar la institución:", errorData);
        alert("Error al registrar la institución. Por favor, inténtalo de nuevo.");
      } else {
        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        alert("Institución registrada exitosamente.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.");
    }
  };

  return (
      <section className="w-6/10 pl-50 p-10 justify-center items-center max-md:pl-5 max-md:pr-5 max-md:w-full">
        <div className="flex flex-col my-auto text-xl">
          <header className="text-center mb-5 max-w-md mx-auto">
            <h2
                className="text-center text-4xl font-bold text-[#1A0023] mb-2 whitespace-nowrap"
                style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
              Registro de Institución
            </h2>
            <div className="w-50 h-[2px] bg-[#1A0023] mx-auto" />
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <FormField
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Universidad del Valle"
            />
            <FormField
                label="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="10298760"
            />
            <FormField
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle 13 # 100-00"
            />
            <FormField
                label="Logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="URL"
            />

            <div>
              <div className="flex items-center gap-12 mt-2 mb-2">
                <label className="text-[16px] font-roboto font-bold text-[#1A0023]">
                  Colores institucionales:
                </label>
                <button
                    type="button"
                    onClick={addColor}
                    className="flex gap-2"
                    style={{
                      backgroundColor: "#1A0023",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "14px",
                      fontSize: "16px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "roboto",
                    }}
                >
                  + Añadir color
                </button>

              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 max-w-md">
                {colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2 text-[15px] font-roboto relative">
                      <ColorInput
                          label={`Color ${index + 1}`}
                          value={color}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                      />
                      {colors.length > 1 && (
                          <button
                              type="button"
                              onClick={() => removeColor(index)}
                              className="absolute right-2 top-5.5 text-red-500 hover:text-red-700"
                              style={{
                                backgroundColor: "transparent",
                                borderRadius: "50px",
                                fontSize: "16px",
                                fontWeight: 500,
                              }}
                          >
                            ✖
                          </button>
                      )}
                    </div>
                ))}
              </div>
            </div>

            <Checkbox
                checked={acceptedTerms}
                onChange={setAcceptedTerms}
                label={
                  <>
                    Acepto los{" "}
                    <span className="underline font-medium">
                  términos y condiciones
                </span>{" "}
                    del servicio
                  </>
                }
            />

            <div className="flex justify-center gap-4 mt-6 mb-4">
              <button
                  type="submit"
                  style={{
                    backgroundColor: "#1A0023",
                    color: "white",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "2px solid #1A0023",
                    fontSize: "16px",
                    fontWeight: "bold",
                    minWidth: "150px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#32003d"}}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#1A0023"}}
              >
                Registrarme
              </button>
              <button
                  type="button"
                  style={{
                    backgroundColor: "transparent",
                    color: "#1A0023",
                    padding: "12px 10px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "2px solid #1A0023",
                    minWidth: "150px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#B19CD7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
              >
                Ya tengo cuenta
              </button>
            </div>
          </form>
        </div>
      </section>
  );
};
