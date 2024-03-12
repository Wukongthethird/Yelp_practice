import { useState } from 'react'
import * as ReactDOM from "react-dom/client";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./routes/Home"
import Update from "./routes/Update"
import Restaurantsdetailpage from "./routes/RestaurantsDetailPage"
import AddNewRestaurant from './routes/AddNewRestaurant';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import RoutesOrganizer from './routes/RoutesOrganizer';



// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

function App() {
  
  // const user = await yelpAPI.loginUser(formData);


  return (
    <BrowserRouter>
      <RoutesOrganizer/>
    </BrowserRouter>
     
  )
}

export default App
