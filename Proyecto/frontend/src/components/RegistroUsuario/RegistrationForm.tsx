"use client";
import React, { useState } from "react";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";
import { CheckboxField } from "./CheckboxField";
import { ActionButtons } from "./ActionButtons";
import axios from "axios";

export function RegistrationForm() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [idEstudiantil, setIdEstudiantil] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("Pasajero"); // Valor por defecto
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        if (!nombre || !apellido || !telefono || !direccion || !contrasena) {
            setError("Por favor, completa todos los campos obligatorios.");
            setIsSubmitting(false);
            return;
        }

        if (!acceptedTerms) {
            setError("Debes aceptar los términos y condiciones.");
            setIsSubmitting(false);
            return;
        }

        const data = {
            nombre,
            apellido,
            direccion,
            telefono,
            contrasena,
            correo,
            id_estudiantil: idEstudiantil,
            rol,
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${apiUrl}/usuarios/usuarios/`, data);
            console.log("Respuesta del servidor:", response.data);
            setSuccess("¡Registro exitoso! Redirigiendo...");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Error al registrar. Por favor intenta nuevamente.");
            } else {
                setError("Error desconocido al registrar usuario");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col flex-1 justify-start items-center p-11 pl-30 max-md:p-8 max-sm:p-5">
            <header
                className="mb-4 text-5xl font-bold text-center text-red-700 leading-[52px] max-md:text-4xl max-md:leading-10 max-sm:mb-6 max-sm:text-3xl max-sm:leading-9"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
                Crear una cuenta
            </header>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 items-start max-w-[554px] w-[554px] max-md:w-full max-sm:gap-5">
                <FormField
                    label="Nombre"
                    placeholder="Pepito"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <FormField
                    label="Apellido"
                    placeholder="Pérez"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <FormField
                    label="ID estudiantil "
                    placeholder="2223510-3743"
                    optional={true}
                    value={idEstudiantil}
                    onChange={(e) => setIdEstudiantil(e.target.value)}
                />
                <FormField
                    label="Teléfono"
                    placeholder="3157277727"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <FormField
                    label="Dirección"
                    placeholder="Cll 2C Oeste #82 A12"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
                <FormField
                    label="Correo institucional "
                    type="email"
                    placeholder="estudiante@institucion.edu.co"
                    optional={true}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <FormField
                    label="Contraseña"
                    type="password"
                    placeholder="∗∗∗∗∗∗∗∗∗∗∗∗"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <SelectField
                    label="Rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                />
                <CheckboxField
                    checked={acceptedTerms} onChange={setAcceptedTerms} />
                <ActionButtons />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
{success && <p className="text-green-600 text-sm mt-2">{success}</p>}
{isSubmitting && <p className="text-blue-500 text-sm mt-2">Registrando usuario...</p>}

            </form>
        </section>
    );
}

