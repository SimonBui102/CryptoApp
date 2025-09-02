import React from "react";


export default function TableComponent() {

    const tableHeader=[
        {name:"aseet"},
        {name:"name"},
        {name:"price"},
        {name:"total volume"},
        {name:"market cap change"},
        {name:"1H"},
        {name:"24H"},
        {name:"7D"},
    ]

    return(

        <div 
            className="flex flex-col mt-9 border border-gray-500 rounded"
        >
            <table className="w-full table-auto">
                <thead className="capitalize text-base text-gray-400
                    font-medium border-b border-gray-500
                ">
                    <tr>
                        {tableHeader.map((header) => (
                        <th className="py-1">{header.name}</th>
                        ))}
        

                    </tr>

                </thead>

                <tbody>
                    <tr className='text-center text-base border-b border-gray-500 hover:bg-gray-800 last:border-b-0' >
                        {tableHeader.map((cell) => (
                        <td className="py-4">{cell.name}</td>
                        ))}
                        



                    </tr>
                </tbody>


            </table>
        
        </div>
    );


}