import { Box, Link, Heading, Flex, Button, ChakraProvider } from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";


export const Navbar = ()=>{
  // write a usecontext to check if user is login displace

  const user = useContext(UserContext)

  console.log("USEC", user)


  const navigate = useNavigate()

   function logout(){
    user.logout()
    navigate("/");
  }

console.log("nb", user)
  let body = (
    user.user.status =="logout" && Object.keys(user.user.user).length ===0 ?
    <>
    <div>
      <Link href="/login">
      Login
      </Link>
      <Link href="/signup">
      Register
      </Link>
    </div>
    </>
    :
    <div>
      <Link href="/">
        Home
      </Link>
      <button onClick={logout}>Log Out</button>
    </div>

  )

  

  return(
    <div>
       <div>
      <Flex zIndex={1} position={"sticky"} top={0} bg="tan" p={4} align="center">
        <Flex flex={1} m='auto' maxW={800} align="center">

          <Link href="/">
            <Heading>Yelp</Heading>
          </Link>

        <Box ml={"auto"}>{body}</Box>
        </Flex>
      </Flex>
      </div>
    
    </div>
  )


}

