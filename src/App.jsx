import React, { useState } from 'react';
import './App.css';
import { Juego } from './vistas/Juego';
import { AcercaDe } from './vistas/AcercaDe';
import { Home } from './vistas/Home';
import { Header } from './componentes/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './vistas/Login'; 
import Registro  from './vistas/Registro';
import { MisPartidas } from './vistas/MisPartidas';
import { TodasPartidas } from './vistas/TodasPartidas';



export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/acercade' element={<AcercaDe />} />
        <Route path='/juego' element={<Juego />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/todaspartidas' element={<TodasPartidas />} /> 
        <Route path='/mispartidas' element={<MisPartidas />} /> 
        
      </Routes>
    </div>
  );
}
