import React, { createContext, useContext, useState } from 'react'; 

// Creamos el contexto
const GlobalClicksContext = createContext(); // Crea el contexto GlobalClicksContext

// Creamos el proveedor del contexto
export const GlobalClicksProvider = ({ children }) => {
  const [globalClicks, setGlobalClicks] = useState(0); // Define el estado globalClicks con valor inicial 0

  const incrementGlobalClicks = () => {
    setGlobalClicks((prevClicks) => prevClicks + 1); // Función para incrementar el contador de clics globales
  };

  return (
    <GlobalClicksContext.Provider value={{ globalClicks, incrementGlobalClicks }}>
      {children} 
    </GlobalClicksContext.Provider>
  );
};


export const useGlobalClicks = () => useContext(GlobalClicksContext); 

// Componente para mostrar el número total de clics
export const TotalClicksCounter = () => {
  const { globalClicks } = useGlobalClicks(); // Obtiene el valor globalClicks del contexto

  return <p>Total de clics: {globalClicks}</p>; // Muestra el número total de clics
};
