import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [coinData, setCoinData] = useState(); 

  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);

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
        `https://api.coingecko.com/api/v3/coins/list`,
        options
      ).then((res) => res.json());

      console.log(data);
      setTotalPages(data.length);
    } catch (error) {
      console.log(error);
    }

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
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
        options
      ).then((res) => res.json());

      // console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchCoinData = async (coinId) => {
   setCoinData();

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
        `https://api.coingecko.com/api/v3/coins/${coinId}?market_data=true&developer_data=true&dex_pair_format=contract_address`,
        options
      ).then((res) => res.json());

       console.log(data);
      setCoinData(data);
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
      ).then((res) => res.json());

      //console.log(data.coins);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () =>{

    setPage(1);
    setCoinSearch("");


  }

  useEffect(() => {
    fetchCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        fetchSearchData,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setTotalPages,
        resetFunction,
        perPage,
        setPerPage,
        fetchCoinData,
        coinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
