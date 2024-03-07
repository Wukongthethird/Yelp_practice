import React from 'react'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./routes/ErrorPage";
import { Outlet } from "react-router-dom";
import App from "./App"


// const router = createBrowserRouter([
  
  
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <div id="detail">
        <Outlet />
      </div>
      <App/>
  </React.StrictMode>,
)
