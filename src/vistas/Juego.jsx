import React from 'react';
import { GrupoTarjetas } from '../componentes/GrupoTarjetas'; 
import { GlobalClicksProvider, TotalClicksCounter } from '../context/Globalclics'; 

export function Juego() {       
    return(          
        <div id="home" className="mt-4">             
            <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg animate-bounce">
                POKEMONS MEMORY
            </h1>
            <GlobalClicksProvider> 
                <div className="text-center mb-4">
                    <TotalClicksCounter /> 
                </div>
                <GrupoTarjetas />
            </GlobalClicksProvider>
        </div>      
     )    
}
