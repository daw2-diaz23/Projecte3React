import React, { useState, useEffect } from 'react';
import { useGlobalClicks } from '../context/Globalclics';

export function Tarjeta({ id, nombre, imagen, onApareamiento }) {
  const { incrementGlobalClicks } = useGlobalClicks();
  const [contadorClicks, setContadorClicks] = useState(0);
  const [mostrarFrontal, setMostrarFrontal] = useState(false);
  const [emparejada, setEmparejada] = useState(false);

  const aumentarContador = () => {
    setContadorClicks(contadorClicks + 1);
    incrementGlobalClicks();
    setMostrarFrontal(true);
    if (!emparejada) {
      onApareamiento(nombre, imagen);
    }
  };

  useEffect(() => {
    if (emparejada) {
      setMostrarFrontal(true);
    } else {
      const timeoutId = setTimeout(() => {
        setMostrarFrontal(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [emparejada]);

  const manejarEmparejamiento = () => {
    setEmparejada(true);
  };

  useEffect(() => {
    if (emparejada) {
      setMostrarFrontal(true);
    }
  }, [emparejada]);

  useEffect(() => {
    if (!emparejada && mostrarFrontal) {
      // Si la tarjeta no está emparejada pero se está mostrando,
      // se restablece su estado después de 1 segundo
      const timeoutId = setTimeout(() => {
        setMostrarFrontal(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [emparejada, mostrarFrontal]);

  return (
    <div
      className={`bg-slate-200 rounded w-[225px] h-[300px] border p-2 shadow-lg text-center ${emparejada ? 'emparejada' : ''}`}
      onClick={!mostrarFrontal ? aumentarContador : undefined}
    >
      <p>Clicks: {contadorClicks}</p>
      {mostrarFrontal || emparejada ? (
        <>
          <img className="h-[250px]" src={imagen} alt={nombre} />
          <h2 className="pt-1">{nombre}</h2>
        </>
      ) : (
        <img className="h-[250px]" src="pokebola.png" alt="fotocara" />
      )}
    </div>
  );
}
