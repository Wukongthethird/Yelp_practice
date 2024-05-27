import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Route } from "react-router-dom";
import { Box, Center, Flex } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Center>
      
        <LoginForm />
      </Center>
    </Flex>
  );
};

export default Login;
