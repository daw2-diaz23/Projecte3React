// ContadorTiempo.js
import React, { useEffect, useState, useRef } from 'react';

export function ContadorTiempo({ tiempoMaximo, onTiempoAgotado }) {
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTiempoRestante(prevTiempo => {
        if (prevTiempo <= 1) {
          clearInterval(timerRef.current);
          onTiempoAgotado();
          return 0;
        }
        return prevTiempo - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [onTiempoAgotado]);

  return (
    <div>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
    </div>
  );
}
