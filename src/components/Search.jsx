import React, { useContext, useEffect, useState } from "react"
import searchIcon from "../assets/search.svg"
import { CryptoContext } from "../context/CryptoContext";


export function useDebounce(value, timeDelay){

    const [searchData,setSearchData] = useState(value);


    useEffect(() =>{

        const handler = setTimeout(() => {
        
            setSearchData(value);

        },timeDelay);

        return() => {

            clearTimeout(handler);


        }




    },[value,timeDelay])




    return searchData;


}




export default function Search() {

    const[searchText,setSearchText] = useState("");
    let {searchData,fetchSearchData,setCoinSearch,setSearchData} = useContext(CryptoContext);


    //Using debounce function

    const debounceSearchData = useDebounce(searchText,600);

    useEffect(()=>{

        if(debounceSearchData){
           
            fetchSearchData(debounceSearchData);

        }



    },[debounceSearchData])



    const handleInput = (e) => {

        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearchData(searchText);


    }

    const selectCoin= (coin) => {
        setCoinSearch(coin);
        setSearchData("");
        setSearchText("");

    }




    return(
        <div className="relative">

            <form className="w-96 flex items-center relative ml-7 font-mono " onSubmit={handleSubmit}>
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
                 className="absolute top-11 right-0 w-96 h-96 
                 overflow-x-hidden bg-gray-800 opacity-85 rounded py-2 backdrop-blur-md"
                 >
                    
                    {searchData ?  
                    
                        searchData.map((coin) => {

                            return(
                                <li className=" flex items-center ml-4 my-2 cursor-pointer" key={coin.id}
                                    onClick={() => selectCoin(coin.id)}
                                >
                                    <img
                                        className="w-[1rem] h-[1rem] mx-1.5"
                                        src={coin.thumb}
                                        alt={coin.name}
                                    />

                                    <span> {coin.name}</span>


                                </li>


                            );


                        })

                    :<div className="w-full h-full flex items-center justify-center">

                        <div className="w-8 h-8 border-4 rounded-full border-yellow-200 border-b-gray-800 animate-spin " role="status"/>
                        <span className="ml-2">Searching...</span> 

                    </div>
                    
                    }
                    
                </ul>

                :null


            }

        </div>
    );



}