import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const GlobalClicksContext = createContext();

// Creamos el proveedor del contexto
export const GlobalClicksProvider = ({ children }) => {
  const [globalClicks, setGlobalClicks] = useState(0);

  const incrementGlobalClicks = () => {
    setGlobalClicks((prevClicks) => prevClicks + 1);
  };

  return (
    <GlobalClicksContext.Provider value={{ globalClicks, incrementGlobalClicks }}>
      {children}
    </GlobalClicksContext.Provider>
  );
};

// Función personalizada para usar el contexto
export const useGlobalClicks = () => useContext(GlobalClicksContext);

// Componente para mostrar el número total de clics
export const TotalClicksCounter = () => {
  const { globalClicks } = useGlobalClicks();

  return <p>Total de clics: {globalClicks}</p>;
};
