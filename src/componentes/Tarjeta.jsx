import React, { useState } from 'react';
import { useGlobalClicks } from '../context/Globalclics'; // Importa la función para usar el contexto

export function Tarjeta({ nombre, imagen }) {
  const { incrementGlobalClicks } = useGlobalClicks(); // Obtén la función para incrementar el contador global
  const [contadorClicks, setContadorClicks] = useState(0); // Mantén un estado local para el contador de clics de la tarjeta

  const aumentarContador = () => {
    setContadorClicks(contadorClicks + 1); // Incrementa el contador local
    incrementGlobalClicks(); // Incrementa el contador global
  };

  return (
    <div className="bg-slate-200 rounded w-[225px] h-[300px] border p-2 shadow-lg text-center">
      <p>Clicks: {contadorClicks}</p> {/* Muestra el contador local */}
      <img onClick={aumentarContador} className="h-[250px]" src={imagen} alt={nombre} />
      <h2 className="pt-1">{nombre}</h2>
    </div>
  );
}
