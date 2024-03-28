import {
  Box,
  Link as ChakraLink,
  Heading,
  Flex,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'

import { useContext } from "react";
import UserContext from "../auth/UserContext";

export const Navbar = () => {
  const user = useContext(UserContext);

  function logout(evt) {
    evt.preventDefault();
    user.logout();
  }

  console.log("nav" ,  user )

  let body =
    // user.user.status == "logout" &&
    Object.keys(user.user).length === 0 ? (
      <>
        <div>
          <ChakraLink as={ReactRouterLink} to="/login">Login</ChakraLink>
          <ChakraLink  as={ReactRouterLink}  to="/signup">Register</ChakraLink>
        </div>
      </>
    ) : (
      <div>
        <ChakraLink as={ReactRouterLink}  to="/">Home</ChakraLink>
        <ChakraLink as={ReactRouterLink}  to="/">
          <Button onClick={logout}>Log Out</Button>
        </ChakraLink>
      </div>
    );

  return (
    <div>
      <div>
        <Flex
          zIndex={1}
          position={"sticky"}
          top={0}
          bg="tan"
          p={4}
          align="center"
        >
          <Flex flex={1} m="auto" maxW={800} align="center">
            <ChakraLink as={ReactRouterLink}  to="/">
              <Heading>Yelp</Heading>
            </ChakraLink>

            <Box ml={"auto"}>{body}</Box>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
