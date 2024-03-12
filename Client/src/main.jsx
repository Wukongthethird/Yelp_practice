import React from 'react'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";


import { Outlet } from "react-router-dom";
import App from "./App"
import { ChakraProvider ,extendTheme} from '@chakra-ui/react'

const colors = {
  brand: {
    200: '#90CDF4',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// const router = createBrowserRouter([
  
  
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChakraProvider theme={theme}>
     <div id="detail">
        <Outlet />
      </div>
      <App/>
  </ChakraProvider>
  </React.StrictMode>,
)
