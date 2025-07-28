"use client";
import React, { useState } from "react";
import { FormField } from "./FormField";
import { ActionButtons } from "./ActionButtons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {DateField} from "./DateField.tsx";

export function RegistrationForm() {
    const [placa, setPlaca] = useState("");
    const [modelo, setModelo] = useState("");
    const [color, setColor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tecno, setTecno] = useState("");
    const [soat, setSoat] = useState("");
    const [marca, setMarca] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        navigate("/driver");

        if (!placa || !modelo || !color || !tecno || !soat  || !marca) {
            setError("Por favor, completa todos los campos obligatorios.");
            setIsSubmitting(false);
            return;
        }

        const data = {
            placa,
            modelo,
            color,
            categoria,
            tecno,
            soat,
            marca,
        };


        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${apiUrl}/usuarios/usuarios/`, data);
            console.log("Respuesta del servidor:", response.data);
            setSuccess("¡Registro exitoso! Redirigiendo...");

        } catch (error) {
            console.error("Error al registrar el vehiculo:", error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Error al registrar. Por favor intenta nuevamente.");
            } else {
                setError("Error desconocido al registrar vehículo");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-1 flex-col justify-center gap-10 p-5 pt-10 items-center max-md:p-8 max-sm:p-5">
            <header
                className="text-5xl font-bold text-center text-red-700 leading-[5px] max-md:text-4xl max-md:leading-10 max-sm:mb-6 max-sm:text-3xl max-sm:leading-9"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
                Registrar un Vehículo
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 items-center justify-center w-full max-md:w-full max-sm:gap-5">
                <FormField
                    label="Placa"
                    placeholder="ABC123"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                />
                <FormField
                    label="Modelo"
                    placeholder="Spark"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                />
                <FormField
                    label="Color"
                    placeholder="Rojo"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <FormField
                    label="Categoria"
                    placeholder="Local"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                <DateField
                    label="Tecnicomecánica"
                    placeholder="DD/MM/AAAA"
                    value={tecno}
                    onChange={(value: string) => setTecno(value)}
                    />
                <DateField
                    label="SOAT"
                    placeholder="DD/MM/AAAA"
                    value={soat}
                    onChange={(value: string) => setSoat(value)}
                />
                <FormField
                    label="Marca"
                    placeholder="Chevrolet"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                />
                <ActionButtons />

                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                {success && <p className="text-green-600 text-sm mt-2 text-center">{success}</p>}
                {isSubmitting && <p className="text-blue-500 text-sm mt-2 text-center">Registrando usuario...</p>}
            </form>
        </section>
    );
}

