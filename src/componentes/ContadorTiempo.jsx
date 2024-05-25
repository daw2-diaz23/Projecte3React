import React, { useState, useEffect } from 'react';

export function ContadorTiempo({ tiempoMaximo, onTiempoAgotado, juegoIniciado }) {
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo);

  useEffect(() => {
    let intervalo;
    if (juegoIniciado && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((tiempo) => tiempo - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      onTiempoAgotado();
    }
    return () => clearInterval(intervalo);
  }, [juegoIniciado, tiempoRestante]);

  return (
    <div>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
    </div>
  );
}
