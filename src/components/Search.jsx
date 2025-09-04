import React, { useContext, useState } from "react"
import searchIcon from "../assets/search.svg"
import { CryptoContext } from "../context/CryptoContext";



export default function Search() {

    const[searchText,setSearchText] = useState("");
    let {fetchSearchData} = useContext(CryptoContext);

    const handleInput = (e) => {

        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);
        fetchSearchData(query);



    }




    return(
        <>

            <form className="w-96 flex items-center relative ml-7 font-mono ">
                <input type="text" name="search" 
                    className="w-full bg-gray-800 border border-transparent rounded outline-0 focus:border-yellow-200
                        required pl-2 placeholder:text-gray-500 "

                    placeholder="Search here"
                    onChange={handleInput}
                    value={searchText}
                >
                
                </input>
                
                <button type="submit"
                    className="absolute right-1 cursor-pointer "
                >
                    <img src={searchIcon} className="w-full h-auto" alt="search" />

                </button>



            </form>

            { searchText.length > 0 ?

                <ul
                 className="absolute top-11 right-0 w-full h-96 
                 overflow-x-hidden bg-gray-800 opacity-85 rounded py-2 backdrop-blur-md"
                 >
                    <li>bitcoin</li>
                    <li>dodgecoin</li>
                </ul>

                :null


            }

        </>
    );



}