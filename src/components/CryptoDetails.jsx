import React, { useContext, useEffect,useState } from 'react'
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router';
import { CryptoContext } from '../context/CryptoContext';
import Chart from './Chart';


const HighLowIndicator = ({currentPrice, high,low}) => {

    const[green,setGreen] = useState();

    useEffect(() =>{

        let total = high - low;
        let greenZone = (high - currentPrice)*100/total;
        setGreen(Math.ceil(greenZone)); 


    },[currentPrice, high,low])
    return(
        <>
            <span className='bg-red-400 h-1.5 rounded-l-lg w-[50%]' style={{width: `${100-green}%`}}> &nbsp;</span>
            <span className='bg-green-400 h-1.5 rounded-r-lg w-[50%]' style={{width: `${green}%`}}> &nbsp;</span>
        </>
    )
}


const CryptoDetails = () => {
    let {coinId} = useParams();
    let navigate = useNavigate();

    const {fetchCoinData, coinData,currency} = useContext(CryptoContext);

    useEffect(()=>{

        fetchCoinData(coinId);


    },[coinId])

    const close = () =>{

        navigate("..");

    }



  return ReactDOM.createPortal (
    <div className='fixed top-0 w-full h-full bg-gray-700/30 first-letter: 
    backdrop-blur-sm flex items-center justify-center font-mono ' onClick={close}>
        
        <div className='w-[65%] h-[75%] bg-gray-950/40 rounded-lg text-white relative'
            onClick={(e) => {e.stopPropagation()}}>
            {coinData ? 

             <div className='flex items-center justify-between w-full h-full p-4'> 
                <div className='flex flex-col w-[45%] h-full pr-2  '>

                    <div className='flex items-center w-full'>
                        
                        <img src={coinData.image.large} className='w-[3.2rem] h-[3.2rem] mx-1.5' alt={coinData.id} />
                        <h1 className='text-3xl capitalize font-medium' > {coinData.name}</h1>
                        <span className='text-base py-0.5 px-2.5 ml-2 bg-yellow-300/25 text-yellow-300 rounded uppercase' > {coinData.symbol}</span>
                    

                     </div>

                     <div className='flex w-full mt-6' > 

                        <div className='flex flex-col w-full' >
                            <div className='flex justify-between'> 
                                <span className='text-base capitalize text-gray-500'>Price</span> 
                                <div
                                    className={`text-base px-1 ml-2 font-medium flex items-center rounded uppercase
                                        ${coinData.market_data.market_cap_change_percentage_24h >0 
                                            ?'bg-green-400/25 text-green-400'
                                            :'bg-red-400/25 text-red-400'
                                        }

                                        `}
                                > 
                                    <span>{Number (coinData.market_data.market_cap_change_percentage_24h).toFixed(2)}%</span> 
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                     width="20"
                                      height="20" 
                                      viewBox="0 0 20 20"
                                      className={` w-[1rem] ml-0.5 ${coinData.market_data.market_cap_change_percentage_24h >0 
                                            ?'fill-green-400 rotate-180'
                                            :'fill-red-400'
                                        }`}
                                      >
                                    <path fill="" d="M10 15L2 5h16z"/>
                                    </svg>
                                </div>
                            </div>

                            <h2 className='text-3xl font-bold'> 
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                    maximumSignificantDigits:6,
                            }).format(coinData.market_data.current_price[currency])} 
                            </h2>
                        </div>

                   


                     </div>

                     <div className='flex w-full mt-4 justify-between'>
                        <div className='flex flex-col'> 
                            <span className='text-base capitalize text-gray-500'>Market Cap</span>
                            <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                    minimumFractionDigits: 0,
                                    
                            }).format(coinData.market_data.market_cap[currency])}  </h2>
                        </div>


                        <div className='flex flex-col'> 
                            <span className='text-base capitalize text-gray-500'>Fully Diluted Valuation</span>
                            <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                    notation:"compact",
                           
                            }).format(coinData.market_data.fully_diluted_valuation[currency])}  </h2>
                        </div>
                     </div>

                     
                     <div className='flex flex-col w-full mt-4 justify-between'>
                     
                        <span className='text-base capitalize text-gray-500'>Total Volume</span>
                        <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: currency,
                            minimumFractionDigits: 0,
                        }).format(coinData.market_data.total_volume[currency])}  </h2>
                        


                     </div>

                     <div className='flex w-full mt-4 justify-between'> 
                        <HighLowIndicator 

                            currentPrice={coinData.market_data.current_price[currency]}
                            high={coinData.market_data.high_24h[currency]}
                            low={coinData.market_data.low_24h[currency]}
                        />
                     </div>

                     
                     <div className='flex w-full mt-4 justify-between'>
                        <div className='flex flex-col'> 
                            <span className='text-base capitalize text-gray-500'>Low 24H</span>
                            <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                    minimumFractionDigits: 5,
                                    
                            }).format(coinData.market_data.low_24h[currency])}  </h2>
                        </div>


                        <div className='flex flex-col'> 
                            <span className='text-base capitalize text-gray-500'>High 24H</span>
                            <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                     minimumFractionDigits: 5,
                           
                            }).format(coinData.market_data.high_24h[currency])}  </h2>
                        </div>
                     </div>


                      <div className='flex w-full mt-4 justify-between'>
                        <div className='flex flex-col'> 
                            <span className='text-base capitalize text-gray-500'>Max Supply</span>
                            <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                    minimumFractionDigits: 0,
                                    
                            }).format(coinData.market_data.max_supply)}  </h2>
                        </div>


                        <div className='flex flex-col'> 
                            <span className='text-base capitalize text-gray-500'>Circulating Suply</span>
                            <h2 className='text-lg font-bold'> {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                     minimumFractionDigits: 0,
                           
                            }).format(coinData.market_data.circulating_supply)}  </h2>
                        </div>
                     </div>
                    
                    <div className='flex w-full mt-4 justify-between'> 
                        <div className='flex flex-col'> 
                            <a target={"_blank"} rel="noreferrer" className='text-sm bg-gray-800 text-gray-500 px-1.5 py-0.5 my-1 rounded' href={coinData?.links?.homepage[0]}>{coinData?.links?.homepage[0].substring(0,30)}</a>
                            <a target={"_blank"} rel="noreferrer" className='text-sm bg-gray-800 text-gray-500 px-1.5 py-0.5 my-1 rounded' href={coinData?.links?.blockchain_site[0]}>{coinData?.links?.blockchain_site[0].substring(0,30)}</a>

                            {coinData?.links?.official_forum_url[0]&&
                            <a target={"_blank"} rel="noreferrer" className='text-sm bg-gray-800 text-gray-500 px-1.5 py-0.5 my-1 rounded' href={coinData?.links?.official_forum_url[0]}>{coinData?.links?.official_forum_url[0].substring(0,30)}</a>
                            }
                        </div>

                        <div className='flex flex-col content-start'> 
                            <span className='text-base capitalize text-gray-500' >Sentiment</span>
                            <div className='flex justify-between'> 
                                
                                <div
                                    className={`text-base px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-green-400/25 text-green-400
                                      

                                        `}
                                > 
                                    <span>{Number (coinData.sentiment_votes_up_percentage).toFixed(2)}%</span> 
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                     width="20"
                                      height="20" 
                                      viewBox="0 0 20 20"
                                      className={` w-[1rem] ml-0.5 
                                        fill-green-400 rotate-180`}
                                      >
                                    <path fill="" d="M10 15L2 5h16z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className='flex justify-between'> 
                                
                                <div
                                    className={`text-base px-1 ml-2 my-1 font-medium flex items-center rounded uppercase
                                     bg-red-400/25 text-red-400

                                        `}
                                > 
                                    <span>{Number (coinData.sentiment_votes_down_percentage).toFixed(2)}%</span> 
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                     width="20"
                                      height="20" 
                                      viewBox="0 0 20 20"
                                      className={` w-[1rem] ml-0.5 fill-red-400`}
                                      >
                                    <path fill="" d="M10 15L2 5h16z"/>
                                    </svg>
                                </div>
                            </div>


                            

                        </div>
                     </div>


                </div>
                <div className='flex flex-col w-[55%] h-full '><Chart id={coinData.id}/> </div>

             </div>
            
            
            : null}
        </div>
        
    </div>,
    document.getElementById("model")
  )
}

export default CryptoDetails