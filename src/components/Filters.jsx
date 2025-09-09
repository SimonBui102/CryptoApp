import React from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg"



export default function Filters() {


    return(
        <div className="w-full h-12 border-2 border-gray-500 rounded-lg flex items-center justify-between relative">
            <Search/>
            <div className="flex">
                <form className=" relative flex items-center mr-12 font-mono">
                    <label htmlFor="currency" className="relative flex justify-center items-center mr-2 font-bold">currency:</label>
                    <input type="text" name="currency" placeholder="usd"
                        className="w-16 rounded bg-gray-800 placeholder:text-gray-500 pl-2 required outline-0 
                        border border-transparent focus:border-yellow-200 leading-4"
                    />
                    <button type="submit" className="ml-1 cursor-pointer">

                        <img src={submitIcon} alt= "submit" className="w-full h-auto"/>

                    </button>
                </form>

            </div>
            <div>sorting</div>
            
            </div>

        
    );


}