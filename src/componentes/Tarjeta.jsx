import React, { useState, useEffect } from 'react'; 
import { useGlobalClicks } from '../context/Globalclics'; 

// Define el componente Tarjeta que recibe props: id, nombre, imagen, onApareamiento, emparejada, resetear, y index
export function Tarjeta({ id, nombre, imagen, onApareamiento, emparejada, resetear, index }) {
  const { incrementGlobalClicks } = useGlobalClicks(); // Obtiene la función incrementGlobalClicks del contexto
  const [contadorClicks, setContadorClicks] = useState(0); // Define el estado contadorClicks con valor inicial 0
  const [mostrarFrontal, setMostrarFrontal] = useState(false); // Define el estado mostrarFrontal con valor inicial false

  // Maneja el evento de clic en la tarjeta
  const manejarClick = () => {
    if (!mostrarFrontal && !emparejada) { // Si la tarjeta no está mostrando su lado frontal y no está emparejada
      setContadorClicks(contadorClicks + 1); // Incrementa el contador de clics
      setMostrarFrontal(true); // Muestra el lado frontal de la tarjeta
      onApareamiento(id, nombre, index); // Llama a la función onApareamiento con id, nombre e index de la tarjeta
      incrementGlobalClicks(); // Incrementa el contador de clics globales
    }
  };

  // Efecto para manejar el estado de la tarjeta cuando se empareja o se resetea
  useEffect(() => {
    if (emparejada) {
      setMostrarFrontal(true); // Muestra el lado frontal si la tarjeta está emparejada
    } else if (resetear) {
      setMostrarFrontal(false); // Oculta el lado frontal si la tarjeta debe resetearse
    }
  }, [emparejada, resetear]); // El efecto se ejecuta cuando cambian los estados emparejada o resetear

  return (
    <div
      className={`bg-slate-200 rounded w-[175px] h-[250px] border p-2 shadow-lg text-center transition-transform transform hover:scale-105 cursor-pointer ${emparejada ? 'emparejada' : ''}`}
      onClick={manejarClick} // Asigna la función manejarClick al evento onClick de la tarjeta
    >
      <p>Clicks: {contadorClicks}</p> 
      {mostrarFrontal || emparejada ? ( // Si se muestra el lado frontal o la tarjeta está emparejada
        <>
          <img className="h-[150px] w-full object-cover rounded" src={imagen} alt={nombre} /> 
          <h2 className="pt-1 text-sm font-semibold">{nombre}</h2> 
        </>
      ) : (
        <img className="h-[150px] w-full object-cover rounded" src="pokebola.png" alt="pokebola" /> // Muestra la imagen de una Pokébola
      )}
    </div>
  );
}
