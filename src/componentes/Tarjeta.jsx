import React, { useState, useEffect } from 'react';
import { useGlobalClicks } from '../context/Globalclics';

export function Tarjeta({ id, nombre, imagen, onApareamiento, emparejada, resetear }) {
  const { incrementGlobalClicks } = useGlobalClicks();
  const [contadorClicks, setContadorClicks] = useState(0);
  const [mostrarFrontal, setMostrarFrontal] = useState(false);

  const manejarClick = () => {
    if (!mostrarFrontal && !emparejada) {
      setContadorClicks(contadorClicks + 1);
      setMostrarFrontal(true);
      onApareamiento(id, nombre);
      incrementGlobalClicks();
    }
  };

  useEffect(() => {
    if (emparejada) {
      setMostrarFrontal(true);
    } else if (resetear) {
      setMostrarFrontal(false);
    }
  }, [emparejada, resetear]);

  return (
    <div
      className={`bg-slate-200 rounded w-[225px] h-[300px] border p-2 shadow-lg text-center ${emparejada ? 'emparejada' : ''}`}
      onClick={manejarClick}
    >
      <p>Clicks: {contadorClicks}</p>
      {mostrarFrontal || emparejada ? (
        <>
          <img className="h-[250px]" src={imagen} alt={nombre} />
          <h2 className="pt-1">{nombre}</h2>
        </>
      ) : (
        <img className="h-[250px]" src="pokebola.png" alt="pokebola" />
      )}
    </div>
  );
}
