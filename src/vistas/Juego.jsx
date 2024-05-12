import React from 'react';
import { GrupoTarjetas } from '../componentes/GrupoTarjetas'; // Importa el componente GrupoTarjetas
import { GlobalClicksProvider, TotalClicksCounter } from '../context/Globalclics'; // Importa GlobalClicksProvider y TotalClicksCounter

export function Juego() {       
    return(          
        <div id="home" className="mt-4">             
            <h1 className="text-2xl  mb-2 text-center">POKEMONS MEMORY</h1>
            <GlobalClicksProvider> {/* Envuelve GrupoTarjetas con GlobalClicksProvider */}
                <TotalClicksCounter /> {/* Renderiza TotalClicksCounter dentro del proveedor de contexto */}
                <GrupoTarjetas />
            </GlobalClicksProvider>
        </div>      
     )    
}
