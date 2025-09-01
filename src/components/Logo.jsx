import React from "react";
import { Link } from "react-router";
import logoSVG from "../assets/cryptoLogo.png"


export default function Logo() {

    return(

        <Link to="/" className = 'absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-yellow-200 flex items-center ' >
        
            <img  src={logoSVG} alt="CryptoAppLogo" />
            <span> CryptoApp </span>


        </Link>


    );


}

