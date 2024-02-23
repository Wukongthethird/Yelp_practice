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

  const url = "/api/v1/restaurants"

  function getDataFromServer(){
    axios.get(url).then((res)=>setData(res.data)).catch((err)=>{
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
