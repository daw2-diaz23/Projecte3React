import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { supabase } from '../bd/supabase'; 

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  }); // Define el estado formData para manejar los datos del formulario

  const [error, setError] = useState(null); // Define el estado error para manejar los mensajes de error
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación

  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y el valor del input
    setFormData({
      ...formData,
      [name]: value
    }); // Actualiza el estado formData con el nuevo valor del input
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario
    setError(null); // Resetea el estado de error

    try {
      // Registrar el usuario en Supabase 
      const { data, error } = await supabase.auth.signUp({
        email: formData.correo,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre
          }
        }
      }); // Intenta registrar al usuario con los datos del formulario

      if (error) {
        throw error; // Lanza un error si el registro falla
      }

      console.log('Usuario registrado:', data.user); // Muestra el usuario registrado en la consola

      // Insertar los datos en la tabla personalizada, incluyendo la contraseña (no recomendado)
      const { data: insertData, error: insertError } = await supabase
        .from('perfiles')
        .insert([
          { nombre: formData.nombre, correo: formData.correo, password: formData.password }
        ]); // Intenta insertar los datos del formulario en la tabla personalizada

      if (insertError) {
        throw insertError; // Lanza un error si la inserción falla
      }

      console.log('Datos insertados en la tabla:', insertData); // Muestra los datos insertados en la consola

      localStorage.setItem('registroData', JSON.stringify(formData)); // Guarda los datos del formulario en localStorage
      
      // Limpiar los campos después de registrar
      setFormData({
        nombre: '',
        correo: '',
        password: ''
      }); // Resetea el formulario

      // Redirigir a la página del juego después del registro
      navigate('/juego'); // Ajusta la ruta según tu ruta deseada
    } catch (error) {
      console.error('Error registrando usuario:', error); // Muestra el error en la consola
      setError(error.message); // Establece el mensaje de error en el estado error
    }
  };

  return (
    <div className="flex items-center justify-center"> 
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full mt-20"> 
        <h2 className="text-2xl font-semibold mb-6">Registrarse</h2> 
        <form onSubmit={handleSubmit}> 
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="border rounded w-full px-3 py-2" placeholder="Nombre" required /> 
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-700 font-semibold mb-2">Correo electrónico</label> 
            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} className="border rounded w-full px-3 py-2" placeholder="Correo electrónico" required /> 
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Contraseña</label> 
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border rounded w-full px-3 py-2" placeholder="Contraseña" required /> 
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>} 
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full">Registrarse</button> 
        </form>
      </div>
    </div>
  );
}

export default Registro; 
