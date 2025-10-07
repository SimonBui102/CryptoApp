import { createContext, useContext, useEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();

  let {currency, sortBy} = useContext(CryptoContext);


  const API_KEY = import.meta.env.VITE_API_URL;

  const saveCoin = (coinId) => {

    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if(oldCoins.includes(coinId)){

        return null;
    }
    else{

        let newCoins = [...oldCoins, coinId];
        setAllCoins(newCoins);
        localStorage.setItem("coins", JSON.stringify(newCoins));


    }



  }

  const removeCoin = (coinId) => {

    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    let newCoins = oldCoins.filter( coin => coin !== coinId);

    setAllCoins(newCoins);
    localStorage.setItem("coins", JSON.stringify(newCoins));


  }

   const fetchSavedData = async ( totalCoins = allCoins) => {
 

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
        body: undefined
      };

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        options
      ).then((res) => res.json());

      // console.log(data);
      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if(allCoins.length > 0 ){

        fetchSavedData(allCoins);
    }
    else{

        setSavedData();
    }

  },[allCoins])

  useEffect(() => {

    let isThere =JSON.parse(localStorage.getItem("coins")) || false;


    if(!isThere) {
        //Set the localstorage with empty array
        localStorage.setItem("coins",JSON.stringify([]));
        
    }
    else{
        //Set the state with the current values from the local storage
        let totalCoins = JSON.parse(localStorage.getItem("coins"));
        setAllCoins(totalCoins);

        if (totalCoins.length > 0) {

            fetchSavedData(totalCoins);
        }

    }
    
  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        allCoins,
        removeCoin,
        savedData
       
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
