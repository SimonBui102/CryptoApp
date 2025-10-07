import React from "react";
import { Outlet } from "react-router";
import Logo from '../components/Logo'
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import { TrendingProvider } from "../context/TrendingContext";
import { StorageProvider } from "../context/StorageContext";

export default function Home() {

    return(

        <CryptoProvider>
        <TrendingProvider>
        <StorageProvider>

        <main className='w-full h-full flex flex-col first-letter: content-center items-center relative text-white font-mono'>
            
            <div className= 'w-screen h-screen bg-gray-950 fixed -z-10'/>
            <Logo/>
            <Navigation/>
            <Outlet>


            </Outlet>
        </main>
        </StorageProvider>
        </TrendingProvider>

        </CryptoProvider>
    );


}