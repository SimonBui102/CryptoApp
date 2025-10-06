import { createContext, useEffect, useState } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();


  const API_KEY = import.meta.env.VITE_API_URL;

  const fetchTrendData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      };

      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`,
        options
      ).then((res) => res.json());

      console.log(data);
      setTrendData(data.coins);
    } catch (error) {
      console.log(error);
    }


  };


  const resetTrendingResult = () =>{

    
    fetchTrendData();


  }

  useEffect(() => {
    fetchTrendData();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
       trendData,
       resetTrendingResult,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
