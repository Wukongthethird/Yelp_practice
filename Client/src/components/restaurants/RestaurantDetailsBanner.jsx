import React, { useContext, useState, useEffect } from "react";
import PriceIconContainer from "../priceReview/PriceIconContainer";
import StarRatingContainerForHeading from "../starRating/StarRatingContainerForHeading";
import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

const RestaurantsDetailsBanner = ({ restaurant, images }) => {
  const imageStyle = {
    objectFit: "cover",
    width: " 100%",
    height: "100%",
    // display: "block",
    flexShrink: 0,
    flexGrow: 0,
  };

  console.log(restaurant)
  return (
    <Box pos="relative" width={"100%"} left="0">
      <Box maxW="xl" height={"75%"}>
        <Text
          pos="absolute"
          fontSize={"4xl"}
          top="50%"
          ml={"5%"}
          color="white"
          zIndex={20}
        >
          {restaurant.restaurant.restaurantsName}
        </Text>
        <PriceIconContainer usersPrice={restaurant.generalUsers.averagePrice}/> 
        <StarRatingContainerForHeading rating={restaurant.generalUsers.averageRating}/>


      </Box>

      <Flex
        pos="relative"
        height={"100%"}
        width={"100%"}
        ml={0}
        aspectRatio={3 / 1}
        objectFit={"cover"}
      >
        {images.map((val, ind) => {
          return (
            <Box key={val + ind} width={`100$`} height={"100%"}>
              <Image key={val + ind} src={val} alt="error" style={imageStyle} opacity={"75%"} />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default RestaurantsDetailsBanner;
