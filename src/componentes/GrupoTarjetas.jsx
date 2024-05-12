import React, { useState, useEffect } from 'react';
import { Tarjeta } from './Tarjeta';

export function GrupoTarjetas() {
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomPokemonIds = generateRandomIds(9);
        const promises = randomPokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => ({
              id: data.id,
              nombre: data.name,
              imagen: data.sprites.front_default
            }))
        );

        const pokemonData = await Promise.all(promises);
        
        // Duplicar la matriz de 9 tarjetas para tener 9 parejas (18 tarjetas)
        const duplicatedTarjetas = [...pokemonData, ...pokemonData];
        
        // Desordenar las tarjetas para que aparezcan en posiciones aleatorias
        const shuffledTarjetas = shuffleArray(duplicatedTarjetas);
        
        setTarjetas(shuffledTarjetas);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);

  const generateRandomIds = (count) => {
    const randomIds = [];
    while (randomIds.length < count) {
      const id = Math.floor(Math.random() * 898) + 1; // Hay 898 Pokémon en total
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

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tarjetas.map((pokemon, index) => (
        <Tarjeta
          key={index}
          nombre={pokemon.nombre}
          imagen={pokemon.imagen}
        />
      ))}
    </div>
  );
}
