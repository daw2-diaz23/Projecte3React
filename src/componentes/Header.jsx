
import React from 'react';

export const Header = () => {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="container mx-auto">
        <nav className="mt-4">
          <ul className="flex">
            <li className="mr-6"><a href="/" className="hover:text-gray-400">Home</a></li>
            <li className="mr-6"><a href="/juego" className="hover:text-gray-400">Pokemons Memory</a></li>
            <li className="mr-6"><a href="/juego" className="hover:text-gray-400">Marvel Memory</a></li>
            <li><a href="/acercade" className="hover:text-gray-400">A cerca de</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}


