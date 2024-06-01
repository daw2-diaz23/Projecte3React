import React, { useState, useEffect } from 'react'; 
import { supabase } from '../bd/supabase'; 

export function TodasPartidas() {
  const [partidas, setPartidas] = useState([]); // Define el estado partidas con un array vacío

  useEffect(() => {
    const fetchPartidas = async () => {
      const { data, error } = await supabase
        .from('partidas')
        .select('*'); // Selecciona todas las partidas de la tabla 'partidas'

      if (error) {
        console.error('Error fetching partidas:', error); // Muestra un error en la consola si falla la obtención de las partidas
      } else {
        setPartidas(data); // Establece las partidas en el estado
      }
    };

    fetchPartidas(); // Llama a fetchPartidas cuando el componente se monta
  }, []); // El efecto se ejecuta una vez cuando el componente se monta

  return (
    <div className="container mx-auto px-4"> 
      <h1 className="text-3xl font-bold my-4 text-center">Todas las Partidas</h1> 
      <div className="overflow-x-auto"> 
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md"> 
          <thead className="bg-gray-800 text-white"> 
            <tr>
              <th className="py-2 px-4">Nombre Usuario</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Puntuación</th>
              <th className="py-2 px-4">Clicks</th>
              <th className="py-2 px-4">Fecha</th>
              <th className="py-2 px-4">Hora</th>
            </tr>
          </thead>
          <tbody>
            {partidas.length > 0 ? ( // Comprueba si hay partidas
              partidas.map((partida) => ( // Mapea cada partida a una fila de la tabla
                <tr key={partida.id} className="hover:bg-gray-100"> 
                  <td className="py-2 px-4 border-b border-gray-300">{partida.nombre}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{partida.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{partida.puntos}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{partida.clicks}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{partida.data}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{partida.hora}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 text-center text-gray-500">No se encontraron partidas.</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
