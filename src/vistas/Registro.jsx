import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombreUsuario) {
      nuevosErrores.nombreUsuario = 'El nombre de usuario es obligatorio';
    } else if (nombreUsuario.length < 3) {
      nuevosErrores.nombreUsuario = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!correoElectronico) {
      nuevosErrores.correoElectronico = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
      nuevosErrores.correoElectronico = 'El correo electrónico no es válido';
    }

    if (!contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria';
    } else if (contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const datosUsuario = { nombreUsuario, correoElectronico, contrasena };
      localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
      console.log('Registro guardado en localStorage:', datosUsuario);
      navigate('/login');  // Redirige a la página de inicio de sesión
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md" style={{ marginTop: '-5vh' }}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Registro</h2>
        <form onSubmit={manejarEnvio} className="space-y-6">
          <div>
            <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out ${
                errores.nombreUsuario ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
              }`}
              placeholder="Introduce tu nombre de usuario"
              required
              minLength="3"
            />
            {errores.nombreUsuario && <p className="mt-2 text-sm text-red-600">{errores.nombreUsuario}</p>}
          </div>
          <div>
            <label htmlFor="correoElectronico" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="correoElectronico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out ${
                errores.correoElectronico ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
              }`}
              placeholder="Ej. usuario@ejemplo.com"
              required
            />
            {errores.correoElectronico && <p className="mt-2 text-sm text-red-600">{errores.correoElectronico}</p>}
          </div>
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition duration-300 ease-in-out ${
                errores.contrasena ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
              }`}
              placeholder="Introduce tu contraseña"
              required
              minLength="6"
            />
            {errores.contrasena && <p className="mt-2 text-sm text-red-600">{errores.contrasena}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
