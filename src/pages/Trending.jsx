import React, { useContext } from "react";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router";


export default function Trending() {

    const {trendData} = useContext(TrendingContext);

    return(
         <section 
         className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>

            <div className=" w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly  border border-gray-500 rounded">
                {trendData && trendData.map(coin => 
                
                    <TrendingCoin key ={coin.item.coin_id} data={coin.item} />
                
                )}    
             </div>

             <Outlet/>
            
        </section>

    );
}