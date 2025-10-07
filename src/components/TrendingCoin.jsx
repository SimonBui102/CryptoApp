import React from 'react'
import { useNavigate } from 'react-router'


export default function TrendingCoin({data}) {

    let navigate =useNavigate();

    const getCoinDetails = (id) => {


        navigate(`${id}`);
    }



    return(

        <div className='w-[40%] bg-gray-800 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-700
            
        ' onClick = {() => getCoinDetails(data.id)}> 
            {data?
                <>
                    <h3 className='text-base flex items-center my-0.5'>
                        <span className='text-gray-500 capitalize'>Name:&nbsp;</span>
                        <span className='text-yellow-200'>{data.name}</span>
                       

                    </h3>

                    <h3 className='text-base flex items-center my-0.5'>
                        <span className='text-gray-500 capitalize'>Market Cap Rank:&nbsp;</span>
                        <span className='text-yellow-200'>{data.market_cap_rank}</span>
                        

                    </h3>

                       <h3 className='text-base flex items-center my-0.5'>
                        <span className='text-gray-500 capitalize'>Price (int BTC):&nbsp;</span>
                        <span className='text-yellow-200'>{
                            new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "btc",
                                maximumSignificantDigits: 5
                            }).format(data.price_btc)
                            
                        }</span>
                        

                    </h3>


                        <h3 className='text-base flex items-center my-0.5'>
                        <span className='text-gray-500 capitalize'>Score:&nbsp;</span>
                        <span className='text-yellow-200'>{data.score}</span>
                        

                    </h3>

                     <img src={data.large} alt={data.name} className='w-[15%] h-auto rounded-full absolute top-2/5 -right-0 -translate-y-2/4 ' />

                </>
            :
             <div className="w-full min-h-[60vh] h-full flex items-center justify-center">

                        <div className="w-8 h-8 border-4 rounded-full border-yellow-200 border-b-gray-800 animate-spin " role="status"/>
                        <span className="ml-2">Please Wait...</span> 

                    </div>
        
   
            } 
        </div>

    )
}