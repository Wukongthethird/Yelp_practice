import { Box, Link, Heading, Flex, Button, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter , Routes, Route } from 'react-router-dom';


const  Navbar = ()=>{
  // write a usecontext to check if user is login displace


  let body;


  let body1 = (
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


  )

  return(
    <div>
       <div>
      <Flex zIndex={1} position={"sticky"} top={0} bg="tan" p={4} align="center">
        <Flex flex={1} m='auto' maxW={800} align="center">

          <Link href="/">
            <Heading>Yelp</Heading>
          </Link>

        <Box ml={"auto"}>{body1}</Box>
        </Flex>
      </Flex>
      </div>
    
    </div>
  )


}

export default Navbar