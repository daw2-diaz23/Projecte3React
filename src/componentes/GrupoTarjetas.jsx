import React, { useState, useEffect } from 'react';
import { Tarjeta } from './Tarjeta';
import { useGlobalClicks } from '../context/Globalclics';
import { ContadorTiempo } from './ContadorTiempo';

export function GrupoTarjetas() {
  const { incrementGlobalClicks } = useGlobalClicks();
  const [tarjetas, setTarjetas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const [tarjetasSeleccionadas, setTarjetasSeleccionadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [resetear, setResetear] = useState(false);
  const [volteando, setVolteando] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
        const data = await response.json();

        const randomPokemonIds = getRandomPokemonIds(data.results.length);

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

  const getRandomPokemonIds = (maxId) => {
    const randomIds = [];
    while (randomIds.length < 9) {
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

  const manejarApareamiento = (id, nombre) => {
    if (tarjetasSeleccionadas.length === 0) {
      setTarjetasSeleccionadas([{ id, nombre }]);
    } else if (tarjetasSeleccionadas.length === 1) {
      const [primeraTarjeta] = tarjetasSeleccionadas;
      if (primeraTarjeta.id !== id) {
        setTarjetasSeleccionadas([...tarjetasSeleccionadas, { id, nombre }]);
        if (primeraTarjeta.nombre === nombre) {
          setEmparejadas([...emparejadas, primeraTarjeta.id, id]);
          setPuntos(puntos + 1);
          setTarjetasSeleccionadas([]);
        } else {
          setVolteando(true);
          setTimeout(() => {
            setResetear(true);
            setTarjetasSeleccionadas([]);
            setVolteando(false);
            setTimeout(() => setResetear(false), 100);  // Resetear después de 100ms
          }, 1000);
        }
      }
    }
  };

  const handleTiempoAgotado = () => {
    setTiempoAgotado(true);
  };

  return (
    <div>
      <div className="flex justify-between">
        <p>Puntos acumulados: {puntos}</p>
        {!tiempoAgotado && <ContadorTiempo tiempoMaximo={20} onTiempoAgotado={handleTiempoAgotado} />}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {tarjetas.map((tarjeta, index) => (
          <Tarjeta
            key={index}
            id={tarjeta.id}
            nombre={tarjeta.nombre}
            imagen={tarjeta.imagen}
            onApareamiento={manejarApareamiento}
            emparejada={emparejadas.includes(tarjeta.id)}
            resetear={resetear && !emparejadas.includes(tarjeta.id) && !volteando}
          />
        ))}
      </div>
    </div>
  );
}
