import React, { useState, useEffect } from 'react';

export function ContadorTiempo({ tiempoMaximo, onTiempoAgotado }) {
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempoRestante(prevTiempoRestante => {
        if (prevTiempoRestante === 0) {
          clearInterval(intervalId);
          onTiempoAgotado();
          return 0;
        }
        return prevTiempoRestante - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTiempoAgotado]);

  return (
    <div>
      Tiempo restante: {tiempoRestante} segundos
    </div>
  );
}
