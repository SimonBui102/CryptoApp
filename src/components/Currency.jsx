import React, { useContext, useRef } from "react";

import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

export default function Currency() {
  const { setCurrency } = useContext(CryptoContext);

  let currencyRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let currency = currencyRef.current.value;
    console.log(currency);
    setCurrency(currency);
    currencyRef.current.value = "";
  };

  return (
    <>
    
      <form
        className=" relative flex items-center mr-12 font-mono"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="currency"
          className="relative flex justify-center items-center mr-2 font-bold"
        >
          currency:
        </label>
        <input
          type="text"
          name="currency"
          placeholder="usd"
          className="w-16 rounded bg-gray-800 placeholder:text-gray-500 pl-2 required outline-0 
                        border border-transparent focus:border-yellow-200 leading-4"
          ref={currencyRef}
        />
        <button type="submit" className="ml-1 cursor-pointer">
          <img src={submitIcon} alt="submit" className="w-full h-auto" />
        </button>
      </form>

    </>
  );
}
