import React from "react";
import { Link } from "react-router";
import logoSVG from "../assets/cryptoLogo.png"


export default function Logo() {

    return(

        <Link to="/" className = 'absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-2xl text-yellow-200 flex items-center gap-0.5' >
        
            <img  src={logoSVG} alt="CryptoAppLogo" />
            <span> CryptoApp </span>


        </Link>


    );


}

