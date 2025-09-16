import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router';
import { CryptoContext } from '../context/CryptoContext';




const CryptoDetails = () => {
    let {coinId} = useParams();
    let navigate = useNavigate();

    const {fetchCoinData, coinData} = useContext(CryptoContext);

    useEffect(()=>{

        fetchCoinData(coinId);


    },[coinId])

    const close = () =>{

        navigate("..");

    }



  return ReactDOM.createPortal (
    <div className='fixed top-0 w-full h-full bg-gray-900 opacity-84 first-letter: 
    backdrop-blur-sm flex items-center justify-center font-mono ' onClick={close}>
        
        <div className='w-[65%] h-[75%] bg-gray-950 opacity-95 rounded-lg text-white relative'
            onClick={(e) => {e.stopPropagation()}}>
            {coinData ? coinData.id : null}
        </div>
        
    </div>,
    document.getElementById("model")
  )
}

export default CryptoDetails