import React from "react";
import SignupForm from "../components/forms/SignUpForm";
import { Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const SignUp = () =>{
  return (
    <div>
    <Heading >Sign Up</Heading>
    <div className = "SignUp">
      <SignupForm/>
    </div>
    </div>
  )
}

export default SignUp;