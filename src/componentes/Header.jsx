import React, { useEffect, useState } from 'react'; 
import { supabase } from '../bd/supabase'; 
import { useNavigate } from 'react-router-dom'; 

export const Header = () => {
  const [user, setUser] = useState(null); // Define el estado para el usuario, inicializado como null
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Obtiene la sesión actual de supabase
      if (session) {
        setUser(session.user); // Establece el usuario en el estado si hay una sesión
      }
    };

    fetchSession(); // Llama a la función para obtener la sesión

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user); // Establece el usuario en el estado cuando se inicia sesión
      } else if (event === 'SIGNED_OUT') {
        setUser(null); // Establece el usuario como null cuando se cierra sesión
      }
    });

    return () => {
      authListener.subscription.unsubscribe(); // Limpia el listener de cambios de estado de autenticación
    };
  }, []); // El efecto se ejecuta una vez cuando el componente se monta

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Cierra sesión con supabase
    navigate('/login'); // Navega a la página de inicio de sesión
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md"> 
      <div className="container mx-auto flex justify-between items-center px-4"> 
        <nav className="flex justify-between w-full"> 
          <ul className="flex space-x-6"> 
            <li>
              <a href="/" className="hover:text-gray-400 transition-colors duration-200">Home</a> 
            </li>
            <li>
              <a href="/juego" className="hover:text-gray-400 transition-colors duration-200">Pokemons Memory</a> 
            </li>
           
            <li>
              <a href="/acercade" className="hover:text-gray-400 transition-colors duration-200">A cerca de</a> 
            </li>
            <li>
              <a href="/mispartidas" className="hover:text-gray-400 transition-colors duration-200">Mis Partidas</a> 
            </li>
            <li>
              <a href="/todaspartidas" className="hover:text-gray-400 transition-colors duration-200">Todas Partidas</a> 
            </li>
          </ul>
          <div className="flex space-x-4 items-center"> 
            {user ? (
              <>
                <span className="text-white">Hola, {user.user_metadata?.nombre || 'Usuario'} ({user.email})</span> 
                <button
                  onClick={handleLogout} // Maneja el evento de clic para cerrar sesión
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                  Cerrar Sesión
                </button> 
              </>
            ) : (
              <>
                <a href="/login"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">Inicio</a>
                <a href="/registro" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200">Registro</a>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
