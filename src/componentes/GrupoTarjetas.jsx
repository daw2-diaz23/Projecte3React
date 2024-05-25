import React, { useState, useEffect } from 'react';
import { Tarjeta } from './Tarjeta';
import { useGlobalClicks } from '../context/Globalclics';
import { ContadorTiempo } from './ContadorTiempo';

export function GrupoTarjetas() {
  const { incrementGlobalClicks } = useGlobalClicks();
  const [tarjetas, setTarjetas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [tarjetasSeleccionadas, setTarjetasSeleccionadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [resetearTarjetas, setResetearTarjetas] = useState([]);
  const [volteando, setVolteando] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        const randomPokemonIds = getRandomPokemonIds(data.results.length, 9);

        const promises = randomPokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(pokemonData => ({
              id: pokemonData.id,
              nombre: pokemonData.name,
              imagen: pokemonData.sprites.front_default
            }))
        );

        const fetchedTarjetas = await Promise.all(promises);
        const duplicatedTarjetas = [...fetchedTarjetas, ...fetchedTarjetas];
        const shuffledTarjetas = shuffleArray(duplicatedTarjetas);

        setTarjetas(shuffledTarjetas);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const getRandomPokemonIds = (maxId, count) => {
    const randomIds = [];
    while (randomIds.length < count) {
      const id = Math.floor(Math.random() * (maxId) + 1);
      if (!randomIds.includes(id)) {
        randomIds.push(id);
      }
    }
    return randomIds;
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const manejarApareamiento = (id, nombre, index) => {
    if (tiempoAgotado) return;

    if (!juegoIniciado) {
      setJuegoIniciado(true);
    }

    if (tarjetasSeleccionadas.length === 0) {
      setTarjetasSeleccionadas([{ id, nombre, index }]);
    } else if (tarjetasSeleccionadas.length === 1) {
      const [primeraTarjeta] = tarjetasSeleccionadas;
      if (primeraTarjeta.index !== index) {
        setTarjetasSeleccionadas([...tarjetasSeleccionadas, { id, nombre, index }]);
        if (primeraTarjeta.nombre === nombre) {
          setEmparejadas([...emparejadas, primeraTarjeta.index, index]);
          setPuntos(puntos + 1);
          setTarjetasSeleccionadas([]);
        } else {
          setVolteando(true);
          setTimeout(() => {
            setResetearTarjetas([primeraTarjeta.index, index]);
            setTarjetasSeleccionadas([]);
            setVolteando(false);
            setTimeout(() => setResetearTarjetas([]), 1000);  // Resetear después de 1 segundo
          }, 1000);
        }
      }
    }
  };

  const handleTiempoAgotado = () => {
    setTiempoAgotado(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <p className="text-lg font-bold text-gray-700">Puntos acumulados: <span className="text-blue-500">{puntos}</span></p>
        {juegoIniciado && !tiempoAgotado && <ContadorTiempo tiempoMaximo={20} onTiempoAgotado={handleTiempoAgotado} juegoIniciado={juegoIniciado} />}
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
