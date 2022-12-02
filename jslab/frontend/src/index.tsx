import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import {Registartion} from "./components/Registartion";
import {Login} from "./components/Login";
import {Recepts} from "./components/Recepts";
import {Menu} from "./components/Menu";
import {Logout} from "./components/Logout";
import {Recipe} from "./components/Recipe";
import {AddRecipe} from "./components/AddRecipe";
import {Profile} from "./components/Profile"
import {ChangeRecipe} from "./components/ChangeRecipe"
import {Favorites} from "./components/Favorites";
import {List} from "./components/List";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/registration",
        element: <Registartion/>,
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/recipes",
        element: <Recepts/>
    },
    {
        path: "/logout",
        element: <Logout/>
    },
    {
        path: "/recipe/:id",
        element: <Recipe/>
    },
    {
        path: "/add_recipe",
        element: <AddRecipe/>
    },
    {
        path: "/change_recipe/:id",
        element: <ChangeRecipe/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
    {
        path: "/list",
        element: <List/>
    },
    {
        path: "/favorites",
        element: <Favorites/>
    },
    {
        path: "",
        element: <Recepts/>
    }
]);

root.render(
    <React.StrictMode>
        <Menu/>
        <RouterProvider router={router}/>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
