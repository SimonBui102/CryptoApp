import React, { useContext, useRef } from "react";
import Search from "./Search";
import Currency from "./Currency";
import SortBy from "./SortBy";


export default function Filters() {




  return (
    <div className="w-full h-12 border-2 border-gray-500 rounded-lg flex items-center justify-between relative">
      <Search />

      <div className="flex mr-7">
        <Currency />
        <SortBy/>



      </div>

    

    </div>
  );
}
