import React from "react";
import SignupForm from "../components/forms/SignUpForm";
import { Route } from "react-router-dom";
import { Heading , Flex, Center} from "@chakra-ui/react";

const SignUp = () =>{
  return (
  
    <Flex
    width={"100vw"}
    height={"100vh"}
    alignContent={"center"}
    justifyContent={"center"}
  >
      
    <Center>


      <SignupForm/>
      </Center>
    </Flex>
  
  )
}

export default SignUp;