import React from "react";
import { Outlet } from "react-router";
import Logo from '../components/Logo'

export default function Home() {

    return(
        <main className='w-full h-full flex flex-col first-letter: content-center items-center text-white font-mono'>
            
            <div className= 'w-screen h-screen bg-gray-950 fixed -z-10'/>
            <Logo/>
            <Outlet>


            </Outlet>
        </main>
    );


}