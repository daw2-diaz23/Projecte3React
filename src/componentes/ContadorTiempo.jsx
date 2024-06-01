import React, { useState, useEffect } from 'react'; 

// Define el componente ContadorTiempo que recibe props: tiempoMaximo, onTiempoAgotado, y juegoIniciado
export function ContadorTiempo({ tiempoMaximo, onTiempoAgotado, juegoIniciado }) {
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo); // Define el estado tiempoRestante con valor inicial igual a tiempoMaximo

  useEffect(() => {
    let intervalo; // Variable para almacenar el identificador del intervalo
    if (juegoIniciado && tiempoRestante > 0) {
      // Si el juego ha iniciado y el tiempo restante es mayor a 0
      intervalo = setInterval(() => {
        setTiempoRestante((tiempo) => tiempo - 1); // Disminuye el tiempo restante en 1 cada segundo
      }, 1000);
    } else if (tiempoRestante === 0) {
      onTiempoAgotado(); // Llama a la función onTiempoAgotado si el tiempo se ha agotado
    }
    return () => clearInterval(intervalo); // Limpia el intervalo cuando el componente se desmonta o se actualiza
  }, [juegoIniciado, tiempoRestante]); // Dependencias del useEffect: se ejecuta cuando juegoIniciado o tiempoRestante cambian

  return (
    <div>
      <p>Tiempo restante: {tiempoRestante} segundos</p> 
    </div>
  );
}
