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
    path: "/recepts",
    element: <Recepts/>
  }
]);

root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
