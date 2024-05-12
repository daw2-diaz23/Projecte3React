import React, { useState } from 'react';
import './App.css';
import { Juego } from './vistas/Juego';
import { AcercaDe } from './vistas/AcercaDe';
import { Home } from './vistas/Home'
import { Header } from './componentes/Header';
import { Route, Routes } from 'react-router-dom';


export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
       
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/acercade' element={<AcercaDe />}></Route>
        <Route path='/juego' element={<Juego />} />
      </Routes>
 
       
      
        
        
      
    
  
      
    </div>
  );
}
