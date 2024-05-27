import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Link as ChakraLink, Container, Flex, Image,Text } from "@chakra-ui/react";

const RestaurantsDetailsBanner = ({ restaurant, images }) => {
  const imageStyle = {
    objectFit: "cover",
    width: " 100%",
    height: "100%",
    // display: "block",
    flexShrink: 0,
    flexGrow: 0,
  };

  console.log("images", images)

  return (
    // <Box pos="relative"  width={"100%"} left="0">
      
    // <Flex pos="relative" height={"100%"} width={"100vw"} ml={0} aspectRatio={3 / 1}  objectFit={"cover"}>
    //   {images.map((val, ind) => {
    //     return (
    //       <Box
    //       key={val + ind}
    //         width={`100$`}
    //         height = {"100%"}  
    //       >
    //         <Image
    //           key={val + ind}
    //           src={val}
    //           alt="error"
    //           style={imageStyle}
    //         />
    //       </Box>
    //     );
    //   })}
    // </Flex>
    // </Box>
    <>
    <Box
    width={`100$`}
    height = {"100%"}  
  
  ></Box>

    <Box pos="relative"  width={"100%"} left="0">
   
    <Flex pos="relative" height={"100%"} width={"100vw"} ml={0} aspectRatio={3 / 1}  objectFit={"cover"}>
      {images.map((val, ind) => {
        return (
          <Box
          key={val + ind}
            width={`100$`}
            height = {"100%"}  
            bgImage= {`"url"(require${val})`}
    
          >
        
          </Box>
        );
      })}
    </Flex>
    </Box>
    </>
  );
};

export default RestaurantsDetailsBanner;
