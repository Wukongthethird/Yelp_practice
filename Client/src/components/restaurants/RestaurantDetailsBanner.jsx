import React, { useContext, useState, useEffect } from "react";
import PriceIconContainer from "../priceReview/PriceIconContainer";
import StarRatingContainerForHeading from "../starRating/StarRatingContainerForHeading";
import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  HStack,
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

  console.log(restaurant);
  return (
    <Box pos="relative" width={"100%"} left="0">
      <HStack maxW="xl" height={"75%"} spacing={"10px"}>
        <Box pos="absolute" top="40%" ml={"5%"} zIndex={20}>
          <Text
            fontSize={["xl", "xl", "2xl", "2xl", "6xl", "6xl"]}
            color="white"
          >
            {restaurant.restaurant.restaurantsName}
          </Text>
        </Box>
        <Box zIndex={50} top={"60%"} ml={"5%"} pos="absolute" padding={0}>
          <PriceIconContainer
            usersPrice={restaurant.generalUsers.averagePrice}
          />
        </Box>
        <Box zIndex={50} top={"70%"} ml={"5%"} pos="absolute" xpadding={0}>
          <StarRatingContainerForHeading
            rating={restaurant.generalUsers.averageRating}
          />
        </Box>
      </HStack>

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
              <Image
                key={val + ind}
                src={val}
                alt="error"
                style={imageStyle}
                opacity={"85%"}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default RestaurantsDetailsBanner;
