import React, { useState } from 'react';
import './App.css';
import { Juego } from './vistas/Juego';
import { Header } from './componentes/header';

import { GrupoTarjetas } from './componentes/GrupoTarjetas';
import { GlobalClicksProvider , TotalClicksCounter } from './context/Globalclics';






export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      
      
      <GlobalClicksProvider>
      <div>
        <Header />
        <Juego />
        <TotalClicksCounter />
        <GrupoTarjetas />
      </div>
    </GlobalClicksProvider>
  
      
    </div>
  );
}
