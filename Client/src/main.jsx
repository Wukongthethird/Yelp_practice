import React from 'react'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import { Outlet } from "react-router-dom";
import App from "./App"
import Home from "./routes/home"
import Update from "./routes/update"
import Restaurantsdetailpage from "./routes/restaurantsdetailpage"

// const router = createBrowserRouter([
  
  
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <div id="detail">
        <Outlet />
      </div>
      <App/>
      <Home/>
      hello
      <Update/>
      <Restaurantsdetailpage/>
  </React.StrictMode>,
)
