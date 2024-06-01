import React, { useState, useEffect } from 'react'; 
import { supabase } from '../bd/supabase'; 

export function MisPartidas() {
  const [partidas, setPartidas] = useState([]); // Define el estado partidas con un array vacío
  const [user, setUser] = useState(null); // Define el estado user como null

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser(); // Obtiene el usuario autenticado de supabase
      if (error) {
        console.error('Error fetching user:', error); // Muestra un error en la consola si falla la obtención del usuario
        return;
      }
      console.log('Usuario obtenido:', user); // Muestra el usuario en la consola
      setUser(user); // Establece el usuario en el estado
      if (user) {
        fetchPartidas(user.email); // Si hay un usuario, llama a fetchPartidas con el email del usuario
      }
    };

    const fetchPartidas = async (email) => {
      console.log('Fetching partidas para el usuario con email:', email); // Muestra un mensaje en la consola
      const { data, error } = await supabase
        .from('partidas')
        .select('*')
        .eq('email', email); // Selecciona todas las partidas del usuario con el email especificado

      if (error) {
        console.error('Error fetching partidas:', error); // Muestra un error en la consola si falla la obtención de las partidas
      } else {
        console.log('Partidas obtenidas:', data); // Muestra las partidas obtenidas en la consola
        setPartidas(data); // Establece las partidas en el estado
      }
    };

    fetchUser(); // Llama a fetchUser cuando el componente se monta
  }, []); // El efecto se ejecuta una vez cuando el componente se monta

  const deletePartida = async (id) => {
    const { error } = await supabase
      .from('partidas')
      .delete()
      .eq('id', id); // Elimina la partida con el ID especificado

    if (error) {
      console.error('Error deleting partida:', error); // Muestra un error en la consola si falla la eliminación
    } else {
      setPartidas(partidas.filter(partida => partida.id !== id)); // Filtra y elimina la partida del estado
    }
  };

  return (
    <div className="container mx-auto px-4"> 
      <h1 className="text-3xl font-bold my-4 text-center">Mis Partidas</h1>
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
              <th className="py-2 px-4">Acciones</th>
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
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" // Botón de eliminar con estilos
                      onClick={() => deletePartida(partida.id)} // Llama a deletePartida al hacer clic
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 text-center text-gray-500">No se encontraron partidas.</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
