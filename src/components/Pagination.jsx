import React, { useContext, useRef, useState } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    console.log(val);

    if (val > 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
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
        type="number"
        name="currency"
        min={1}
        max={100}
        placeholder="10"
        className="w-16 rounded bg-gray-800 placeholder:text-gray-500 pl-2 required outline-0 
                               border border-transparent focus:border-yellow-200 leading-4
                               [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]"
        ref={inputRef}
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

export default function Pagination() {
  let { page, setPage, totalPages, perPage } = useContext(CryptoContext);

  let TotalNumber = Math.ceil(totalPages / perPage);


  const handleNextButton = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage((page) => page + 1);
    }
  };

  const handlePrevButton = () => {
    if (page < 2) {
      return null;
    } else {
      setPage((page) => page - 1);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(1);
    } else {
      setPage((page) => page - 3);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber);
    } else {
      setPage((page) => page + 3);
    }
  };

  return (
    <div className="flex items-center">
      <PerPage />

      <ul className="flex items-center justify-end text-sm">
        <li className="flex items-center">
          <button
            className=" cursor-pointer outline-0 hover:text-yellow-200 w-8"
            onClick={handlePrevButton}
          >
            <img
              src={paginationArrow}
              className="w-full h-auto rotate-180"
              alt="left"
            />
          </button>
        </li>
        {page >= 4 && (
          <li>
            <button
              className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              onClick={multiStepPrev}
            >
              ...
            </button>
          </li>
        )}
        {page > 1 && (
          <li>
            <button
              className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-800 mx-1.5"
              onClick={handlePrevButton}
            >
              {page - 1}
            </button>
          </li>
        )}
        <li>
          <button
            className=" outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-300 text-gray-800 mx-1.5"
            disabled
          >
            {page}
          </button>
        </li>
        {page + 1 !== TotalNumber && page !== TotalNumber && (
          <li>
            <button
              className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-800 mx-1.5"
              onClick={handleNextButton}
            >
              {page + 1}
            </button>
          </li>
        )}
        {page + 1 !== TotalNumber && page !== TotalNumber && (
          <li>
            <button
              className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              onClick={multiStepNext}
            >
              ...
            </button>
          </li>
        )}
        {page !== TotalNumber && (
          <li>
            <button
              className="cursor-pointer outline-0 hover:text-yellow-400 rounded-full w-8 h-8 flex items-center justify-center bg-gray-800 mx-1.5"
              onClick={() => setPage(TotalNumber)}
            >
              {TotalNumber}
            </button>
          </li>
        )}

        <li>
          <button className="cursor-pointer outline-0 hover:text-yellow-200 w-8">
            <img
              src={paginationArrow}
              className="w-full h-auto "
              alt="right"
              onClick={handleNextButton}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
