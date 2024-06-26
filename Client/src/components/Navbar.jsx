import {
  Box,
  Link as ChakraLink,
  Heading,
  Flex,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../auth/UserContext";

export const Navbar = () => {
  const user = useContext(UserContext);

  function logout(evt) {
    evt.preventDefault();
    user.logout();
  }

  let body =
    // user.user.status == "logout" &&
    Object.keys(user.user).length === 0 ? (
      <>
        <ChakraLink mx="5px" as={ReactRouterLink} to="/login">
          Login
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/signup">
          Register
        </ChakraLink>
      </>
    ) : (
      <>
        <ChakraLink as={ReactRouterLink} to="/">
          <Button onClick={logout} variant="link">
            Log Out
          </Button>
        </ChakraLink>
      </>
    );

  return (
    <Flex
      zIndex={999}
      justify="center"
      position={"fixed"}
      bg="red.400"
      width={"100%"}
      top={0}
      left={0}
      bot={0}
    >
      <Flex position={"static"} flex={1} m="auto" maxW={"100%"} align="center">
        <ChakraLink as={ReactRouterLink} to="/">
          <Heading>Yelp</Heading>
        </ChakraLink>

        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
