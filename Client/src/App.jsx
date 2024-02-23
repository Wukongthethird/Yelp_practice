import { useState } from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import axios from 'axios';



function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState()

  const url = "http://localhost:3000/api/v1/restaurants"
  const url2 = "http://localhost:3000/api/v1/restaurants/1"

  function getDataFromServer(){
    axios.get(url2).then((res)=>setData(res.data)).catch((err)=>{
      console.log(err)
    })
  }
  if (!data){
    getDataFromServer();
  }
  console.log(data)

  


  return (
    
      <div>
        
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </div>
    </div>
  )
}

export default App
