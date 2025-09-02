import React from 'react'
import { NavLink } from 'react-router';

export default function Navigation() {

    const navigation = [
        {name: 'Crypto', href:'/'},
        {name: 'Trending', href:'/trending'},
        {name: 'Saved', href: '/saved'},

    ]


    return(

        <nav className = 'w-[40%] mt-16 flex justify-around align-middle border border-yellow-200 rounded-lg '>


            {navigation.map((item) => (
        
            <NavLink
                to= {item.href}
                end

                className = {({isActive}) => {
                    return `w-full text-base text-lg text-center font-mono m-2.5
                        ${isActive ? 'bg-yellow-200 text-gray-800' : 'bg-gray-800 text-gray-500 hover:text-yellow-200 active:bg-yellow-200 active:text-gray-800'}
                        border-0 cursor-pointer rounded capitalize font-semibold
                    `


                }}
            > 

            {item.name}


            </NavLink>
            ))}

        </nav>

    );

}