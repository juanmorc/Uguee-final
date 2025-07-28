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
    const [tipo, setTipo] = useState("");
    const [tecnomecanica, settecnomecanica] = useState("");
    const [soat, setSoat] = useState("");
    const [marca, setMarca] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const formatDateForBackend = (dateString: string): string => {
        if (!dateString) return "";
        
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return dateString;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        if (!placa || !modelo || !color || !tecnomecanica || !soat || !marca) {
            setError("Por favor, completa todos los campos obligatorios.");
            setIsSubmitting(false);
            return;
        }

        const userId = localStorage.getItem('userId') || '1';

        if (!userId || userId === 'null' || userId === 'undefined') {
            setError("No se encontró información del usuario. Por favor inicia sesión.");
            setIsSubmitting(false);
            return;
        }

        const data = {
            placa: placa.toUpperCase(),
            modelo,
            color,
            categoria: categoria || 'Local',
            tecnomecanica: formatDateForBackend(tecnomecanica),
            soat: formatDateForBackend(soat),
            marca,
            tipo,
            uid: parseInt(userId),
        };

        console.log("=== DATOS A ENVIAR ===");
        console.log("Data completa:", data);
        console.log("UserID:", userId);
        console.log("UserID parseado:", parseInt(userId));

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            console.log("URL de API:", `${apiUrl}/vehiculos/vehiculos/`);
            
            const response = await axios.post(`${apiUrl}/vehiculos/vehiculos/`, data);
            console.log("Respuesta del servidor:", response.data);
            setSuccess("¡Registro exitoso! Redirigiendo...");

            setTimeout(() => {
                navigate("/driver");
            }, 2000);

        } catch (error) {
            console.error("=== ERROR COMPLETO ===");
            console.error("Error:", error);
            
            if (axios.isAxiosError(error)) {
                console.error("Status:", error.response?.status);
                console.error("Data:", error.response?.data);
                console.error("Headers:", error.response?.headers);
                
                const errorMessage = error.response?.data?.message || 
                                   error.response?.data?.detail ||
                                   error.response?.data?.error ||
                                   JSON.stringify(error.response?.data) ||
                                   "Error al registrar. Por favor intenta nuevamente.";
                setError(`Error ${error.response?.status}: ${errorMessage}`);
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
                <FormField
                    label="Tipo"
                    placeholder="Sedan"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <DateField
                    label="Tecnicomecánica"
                    placeholder="DD/MM/AAAA"
                    value={tecnomecanica}
                    onChange={(value: string) => settecnomecanica(value)}
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
                {isSubmitting && <p className="text-blue-500 text-sm mt-2 text-center">Registrando vehiculo...</p>}
            </form>
        </section>
    );
}

