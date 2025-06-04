// app/routes/customizer.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({ message: "Personalizador cargado" });
};

export default function Customizer() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Personalizador de Producto</h1>
      <p>Interfaz en construcción...</p>
    </div>
  );
}
