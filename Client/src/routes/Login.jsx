import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Route } from "react-router-dom";


const Login = ({login}) =>{
  return (
    <>

    <div className = "Login">

      <LoginForm login={login}/>
    </div>
    </>
  
  ) 
}

export default Login;