import React from 'react';

export const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Bienvenido</h1>
        <p className="text-gray-700 text-base leading-relaxed mt-4 text-center">
          ¡Comienza a jugar hoy y lleva tu memoria al siguiente nivel!
        </p>
        <div className="text-center mt-6">
          <a href="/juego" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ver Juego
          </a>
        </div>
      </div>
    </div>
  );
};
