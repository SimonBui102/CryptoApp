import React from "react";
import { Outlet } from "react-router";
import Logo from '../components/Logo'
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";

export default function Home() {

    return(

        <CryptoProvider>

        <main className='w-full h-full flex flex-col first-letter: content-center items-center relative text-white font-mono'>
            
            <div className= 'w-screen h-screen bg-gray-950 fixed -z-10'/>
            <Logo/>
            <Navigation/>
            <Outlet>


            </Outlet>
        </main>

        </CryptoProvider>
    );


}