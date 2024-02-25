import { useState } from 'react'
import * as ReactDOM from "react-dom/client";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import axios from 'axios';
import Home from "./routes/Home"
import Update from "./routes/Update"
import Restaurantsdetailpage from "./routes/RestaurantsDetailPage"
import AddNewRestaurant from './routes/AddNewRestaurant';



// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)
  // const [data, setData] = useState()

  // const url = "http://localhost:3000/api/v1/restaurants"
  // const url2 = "http://localhost:3000/api/v1/restaurants/1"

  // function getDataFromServer(){
  //   axios.get(url2).then((res)=>setData(res.data)).catch((err)=>{
  //     console.log(err)
  //   })
  // }
  // if (!data){ 
  //   getDataFromServer();
  // }
  // console.log(data)

  


  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/restaurants/:id/" element={<Restaurantsdetailpage/>}/>
      <Route exact path="/restaurants/:id/update" element={<Update/>}/>
      <Route exact path = "/create_restaurant" element={<AddNewRestaurant/>}/>
    </Routes>
    </BrowserRouter>
     
  )
}

export default App
