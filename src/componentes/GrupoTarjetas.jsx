
import { Tarjeta } from './Tarjeta'; 

const arrayPersonajes = [
    {
      id: 1,
      nombre: 'Capitan',
      imagen: 'capitan2.webp'
    },
    {
      id: 2,
      nombre: 'Pikachu',
      imagen: 'pikachu.png'
    },
    {
      id: 3,
      nombre: 'Luigi',
      imagen: 'luigi.png'
    },
    {
      id: 4,
      nombre: 'Yoshi',
      imagen: 'yoshi.png'
    },
    {
      id: 5,
      nombre: 'Link',
      imagen: 'link.png'
    },
    {
      id: 6,
      nombre: 'Zelda',
      imagen: 'zelda.png'
    },
    {
      id: 7,
      nombre: 'Donkey Kong',
      imagen: 'donkey-kong.png'
    },
    {
      id: 8,
      nombre: 'Samus',
      imagen: 'samus.png'
    },
    {
      id: 9,
      nombre: 'Mega Man',
      imagen: 'mega-man.png'
    },
    {
      id: 10,
      nombre: 'Spongebob',
      imagen: 'spongebob.png'
    },
    {
      id: 11,
      nombre: 'Bart Simpson',
      imagen: 'bart-simpson.png'
    },
    {
      id: 12,
      nombre: 'Homer Simpson',
      imagen: 'homer-simpson.png'
    },
    {
      id: 13,
      nombre: 'Mickey Mouse',
      imagen: 'mickey-mouse.png'
    },
    {
      id: 14,
      nombre: 'Donald Duck',
      imagen: 'donald-duck.png'
    },
    {
      id: 15,
      nombre: 'Buzz Lightyear',
      imagen: 'buzz-lightyear.png'
    },
    {
      id: 16,
      nombre: 'Woody',
      imagen: 'woody.png'
    },
    {
      id: 17,
      nombre: 'Spider-Man',
      imagen: 'spider-man.png'
    },
    {
      id: 18,
      nombre: 'Batman',
      imagen: 'batman.png'
    },
    {
      id: 19,
      nombre: 'Mario',
      imagen: 'mario.png'
    },
    {
      id: 20,
      nombre: 'Sonic',
      imagen: 'sonic.png'
    },
  ];

export function GrupoTarjetas() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {arrayPersonajes.map((personaje) => (
        <Tarjeta
          key={personaje.id}
          nombre={personaje.nombre}
          imagen={personaje.imagen}
        />
      ))}
    </div>
  );
}
