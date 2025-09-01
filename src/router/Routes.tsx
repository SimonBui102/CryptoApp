import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Crypto from "../pages/Crypto";
import Trending from "../pages/Trending";
import Saved from "../pages/Saved";



const routes = [

    {
        path: '/',
        element: <Home />,
        children: [

            {
                path: '',
                element: <Crypto />
            },

            {
                path: 'Trending',
                element: <Trending />

            },

            {
                path: 'Saved',
                element: <Saved />

            }






        ]

    }



];

export const router= createBrowserRouter(routes);