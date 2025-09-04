import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();

  const API_KEY = import.meta.env.VITE_API_URL;

  const fetchCryptoData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      };

      const data = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
        options
      )
        .then((res) => res.json())
        
      console.log(data);
      setCryptoData(data);

      
    } catch (error) {
      console.log(error);
    }
  };

   const fetchSearchData = async (query) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      };

      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        options
      )
        .then((res) => res.json())
        
      console.log(data);
      setSearchData(data);

      
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    fetchCryptoData();

  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, searchData, fetchSearchData }}>
      {children}
    </CryptoContext.Provider>
  );
};
