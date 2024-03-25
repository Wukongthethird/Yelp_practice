import {
  Box,
  Link,
  Heading,
  Flex,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

export const Navbar = () => {
  const user = useContext(UserContext);

  function logout(evt) {
    evt.preventDefault();
    user.logout();
  }

  console.log("navbar", user);
  let body =
    // user.user.status == "logout" &&
    Object.keys(user.user.user).length === 0 ? (
      <>
        <div>
          <Link href="/login">Login</Link>
          <Link href="/signup">Register</Link>
        </div>
      </>
    ) : (
      <div>
        <Link href="/">Home</Link>
        <Link href="/">
          {" "}
          <button onClick={logout}>Log Out</button>{" "}
        </Link>
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
            <Link href="/">
              <Heading>Yelp</Heading>
            </Link>

            <Box ml={"auto"}>{body}</Box>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
