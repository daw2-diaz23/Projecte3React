import React, { useState, useEffect } from 'react'; 
import Swal from 'sweetalert2'; 
import withReactContent from 'sweetalert2-react-content'; 
import { Tarjeta } from './Tarjeta'; 
import { useGlobalClicks } from '../context/Globalclics'; 
import { ContadorTiempo } from './ContadorTiempo'; 
import { supabase } from '../bd/supabase'; 

const MySwal = withReactContent(Swal); 

export function GrupoTarjetas() {
  const { incrementGlobalClicks, globalClicks } = useGlobalClicks(); // Obtiene el incremento de clics y los clics globales del contexto
  const [tarjetas, setTarjetas] = useState([]); // Define el estado para las tarjetas
  const [puntos, setPuntos] = useState(0); // Define el estado para los puntos
  const [tiempoAgotado, setTiempoAgotado] = useState(false); // Define el estado para el tiempo agotado
  const [juegoIniciado, setJuegoIniciado] = useState(false); // Define el estado para el juego iniciado
  const [tarjetasSeleccionadas, setTarjetasSeleccionadas] = useState([]); // Define el estado para las tarjetas seleccionadas
  const [emparejadas, setEmparejadas] = useState([]); // Define el estado para las tarjetas emparejadas
  const [resetearTarjetas, setResetearTarjetas] = useState([]); // Define el estado para las tarjetas a resetear
  const [volteando, setVolteando] = useState(false); // Define el estado para indicar si se están volteando tarjetas

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Realiza una solicitud para obtener los primeros 151 Pokémon
        const data = await response.json();

        const randomPokemonIds = getRandomPokemonIds(data.results.length, 9); // Obtiene 9 IDs aleatorios de Pokémon

        const promises = randomPokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(pokemonData => ({
              id: pokemonData.id,
              nombre: pokemonData.name,
              imagen: pokemonData.sprites.front_default
            }))
        );

        const fetchedTarjetas = await Promise.all(promises); // Espera a que todas las promesas se resuelvan
        const duplicatedTarjetas = [...fetchedTarjetas, ...fetchedTarjetas]; // Duplica las tarjetas para tener pares
        const shuffledTarjetas = shuffleArray(duplicatedTarjetas); // Baraja las tarjetas

        setTarjetas(shuffledTarjetas); // Establece las tarjetas barajadas en el estado
      } catch (error) {
        console.error('Error fetching Pokemon data:', error); // Manejo de errores
      }
    };

    fetchPokemonData(); // Llama a la función para obtener datos de Pokémon
  }, []); // El efecto se ejecuta una vez cuando el componente se monta

  useEffect(() => {
    if (emparejadas.length === tarjetas.length && juegoIniciado && !tiempoAgotado) {
      const guardarYMostrarMensaje = async () => {
        const { data: { user } } = await supabase.auth.getUser(); // Obtiene el usuario actual de Supabase
        const nombre = user?.user_metadata?.nombre || 'Desconocido';
        const email = user?.email || 'desconocido@example.com';
        await guardarPartida(nombre, email, puntos, globalClicks); // Guarda la partida en la base de datos

        MySwal.fire({
          title: '¡Has ganado!',
          text: '¡Felicidades! Has encontrado todos los pares.',
          icon: 'success',
          confirmButtonText: 'Jugar de nuevo'
        }).then(() => {
          window.location.reload(); // Recarga la página para reiniciar el juego
        });
      };

      guardarYMostrarMensaje(); // Llama a la función para guardar y mostrar el mensaje
    }
  }, [emparejadas, tarjetas.length, juegoIniciado, tiempoAgotado, puntos, globalClicks]); // El efecto se ejecuta cuando cambian estos estados

  const getRandomPokemonIds = (maxId, count) => {
    const randomIds = [];
    while (randomIds.length < count) {
      const id = Math.floor(Math.random() * (maxId) + 1);
      if (!randomIds.includes(id)) {
        randomIds.push(id); // Agrega ID aleatorios no repetidos
      }
    }
    return randomIds; // Devuelve los IDs aleatorios
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Intercambia elementos
    }
    return newArray; // Devuelve el arreglo barajado
  };

  const manejarApareamiento = (id, nombre, index) => {
    if (tiempoAgotado) return;

    if (!juegoIniciado) {
      setJuegoIniciado(true); // Inicia el juego si aún no ha empezado
    }

    incrementGlobalClicks(); // Incrementa el contador de clics globales

    if (tarjetasSeleccionadas.length === 0) {
      setTarjetasSeleccionadas([{ id, nombre, index }]); // Selecciona la primera tarjeta
    } else if (tarjetasSeleccionadas.length === 1) {
      const [primeraTarjeta] = tarjetasSeleccionadas;
      if (primeraTarjeta.index !== index) {
        setTarjetasSeleccionadas([...tarjetasSeleccionadas, { id, nombre, index }]); // Selecciona la segunda tarjeta
        if (primeraTarjeta.nombre === nombre) {
          setEmparejadas([...emparejadas, primeraTarjeta.index, index]); // Marca las tarjetas como emparejadas
          setPuntos(puntos + 1); // Incrementa los puntos
          setTarjetasSeleccionadas([]); // Resetea la selección de tarjetas
        } else {
          setVolteando(true);
          setTimeout(() => {
            setResetearTarjetas([primeraTarjeta.index, index]); // Resetea las tarjetas si no coinciden
            setTarjetasSeleccionadas([]);
            setVolteando(false);
            setTimeout(() => setResetearTarjetas([]), 1000);  // Resetea después de 1 segundo
          }, 1000);
        }
      }
    }
  };

  const handleTiempoAgotado = () => {
    setTiempoAgotado(true); // Marca el tiempo como agotado
    const guardarYMostrarMensaje = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const nombre = user?.user_metadata?.nombre || 'Desconocido';
      const email = user?.email || 'desconocido@example.com';
      await guardarPartida(nombre, email, puntos, globalClicks); // Guarda la partida en la base de datos

      MySwal.fire({
        title: '¡Tiempo agotado!',
        text: 'Has perdido. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Jugar de nuevo'
      }).then(() => {
        window.location.reload(); // Recarga la página para reiniciar el juego
      });
    };

    guardarYMostrarMensaje(); // Llama a la función para guardar y mostrar el mensaje
  };

  const guardarPartida = async (nombre, email, puntos, clicks) => {
    const data = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();

    console.log('Guardando partida con:', { nombre, email, data, hora, puntos, clicks }); // Mensaje de guardado

    const { data: result, error } = await supabase
      .from('partidas')
      .insert([
        { nombre, email, data, hora, puntos, clicks }, // Inserta la partida en la base de datos
      ]);

    if (error) {
      console.error('Error guardando la partida:', error); // Manejo de errores
    } else {
      console.log('Partida guardada con éxito:', result); // Confirmación de éxito
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <p className="text-lg font-bold text-gray-700">Puntos acumulados: <span className="text-blue-500">{puntos}</span></p>
        {juegoIniciado && !tiempoAgotado && <ContadorTiempo tiempoMaximo={30} onTiempoAgotado={handleTiempoAgotado} juegoIniciado={juegoIniciado} />}
        {tiempoAgotado && <p className="text-red-500 text-lg font-semibold">¡Tiempo agotado!</p>}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {tarjetas.map((tarjeta, index) => (
          <Tarjeta
            key={index}
            id={tarjeta.id}
            nombre={tarjeta.nombre}
            imagen={tarjeta.imagen}
            onApareamiento={manejarApareamiento}
            emparejada={emparejadas.includes(index)}
            resetear={resetearTarjetas.includes(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
