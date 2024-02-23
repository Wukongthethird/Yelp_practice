import React from 'react'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";

import Contacts from "./routes/contacts";
import { Outlet } from "react-router-dom";
import App from "./App"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children:[{
      path: "contacts/:contactId",
      element: <Contacts />,
    }]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
     <div id="detail">
        <Outlet />
      </div>
      <App/>
  </React.StrictMode>,
)
