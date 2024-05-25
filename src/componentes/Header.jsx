import React from 'react';

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-gray-400 transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="/juego" className="hover:text-gray-400 transition-colors duration-200">Pokemons Memory</a>
            </li>
            <li>
              <a href="/juego" className="hover:text-gray-400 transition-colors duration-200">Marvel Memory</a>
            </li>
            <li>
              <a href="/acercade" className="hover:text-gray-400 transition-colors duration-200">A cerca de</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
