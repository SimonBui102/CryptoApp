import React,{useState} from "react"
import paginationArrow from "../assets/pagination-arrow.svg"



export default function Pagination() {

    const [currentPage, setCurrentPage] = useState(1);

    const handleNextButton = () =>{

        if(currentPage === TotalNumber){

            return null;
        }

        else{

            setCurrentPage((currentPage) => currentPage +1);

        }



    }

    const handlePrevButton= () =>{

        if(currentPage < 2) {

            return null;

        }

        else{

            setCurrentPage((currentPage) => currentPage -1);
        }

    }

    let TotalNumber =250;


    const multiStepPrev = () => {

        if(currentPage -3 <=1 ){

            setCurrentPage(1);
        }
        else{

            setCurrentPage((currentPage) => currentPage-3);
        }



    }

    const multiStepNext = () => {

        if(currentPage + 3 >= TotalNumber) {

            setCurrentPage(TotalNumber-1);

        }

        else{
            setCurrentPage((currentPage) => currentPage+3);

        }


    }

    return (

        <div className="flex items-center">
            <ul className="flex items-center justify-end text-sm">
                <li className="flex items-center">
                    <button className=" cursor-pointer outline-0 hover:text-yellow-200 w-8" onClick={handlePrevButton}> 
                        <img src={paginationArrow} className="w-full h-auto rotate-180" alt="left"/>
                    </button>
                    
                </li>

                    <li><button className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-lg" onClick={multiStepPrev}>...</button></li>
                    <li><button className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-800 mx-1.5" onClick={handlePrevButton}>{currentPage-1}</button></li>
                    <li><button className=" outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-300 text-gray-800 mx-1.5" disabled>{currentPage}</button></li>
                    <li><button className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-800 mx-1.5" onClick={handleNextButton}>{currentPage+1}</button></li>
                    {   currentPage + 1 !== TotalNumber && currentPage !== TotalNumber &&
                        <li><button className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-lg" onClick={multiStepNext}>...</button></li>
                    }
                    { currentPage!==TotalNumber &&
                        <li><button className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-800 mx-1.5" onClick={() => setCurrentPage(TotalNumber)}>{TotalNumber}</button></li>
                    }

                 <li>
                    <button className="cursor-pointer outline-0 hover:text-yellow-200 w-8"> 
                        <img src={paginationArrow} className="w-full h-auto " alt="right" onClick={handleNextButton}/>
                    </button>
                </li>

            </ul>

        </div>

    );



}