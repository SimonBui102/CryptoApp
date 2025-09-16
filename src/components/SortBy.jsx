
import React, { useContext, useRef } from "react";
import selectIcon from "../assets/select-icon.svg";
import { CryptoContext } from "../context/CryptoContext";



export default function SortBy() {

        const {setSortBy} = useContext(CryptoContext);
    
    
        const handleClick = (e) =>{
    
            e.preventDefault();
    
            setSortBy(e.target.value);
    
    
        }

    return(

                  <label className="relative flex justify-center items-center">
        <span className="font-bold mr-2">Sort By:</span>

        <select name="sortby"
            className="rounded bg-gray-800 text-base pl-2 pr-10 py-0.5 leading-4 capitalize focus:outline-0"
            onClick={handleClick}
        >
            <option value="market_cap_desc"> market cap desc</option>
            <option value="market_cap_asc"> market cap asc</option>
            <option value="volume_desc"> volume desc</option>
            <option value="volume_asc"> volume asc</option>
            <option value="id_desc"> id desc</option>
            <option value="id_asc"> id asc</option>

        </select>

        <img src={selectIcon} alt="submit" className="w-[1rem] h-auto absolute right-0 top-2 pointer-events-none " />

      </label>

    )
}