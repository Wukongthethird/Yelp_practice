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
      <Route exact path = "/signup" element={<SignUp/>}/>
      <Route exact path = "/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
     
  )
}

export default App
