import React from "react";
import RestaurantCard from "./RestaurantCard";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Box, SimpleGrid, HStack} from "@chakra-ui/react";

const NewRestaurantContainer = ({ restaurants }) => {
  return (
    <HStack spacing="20px" overflow={"hidden"}>
      {restaurants.map((restaurant) => {
        return (
          <Box key={uuidv4()}>
            <RestaurantCard key={uuidv4()} restaurant={restaurant} />
          </Box>
        );
      })}
    </HStack>
  );
};

//https://www.geeksforgeeks.org/react-proptype-array-with-shape/
//https://legacy.reactjs.org/docs/typechecking-with-proptypes.html


export default NewRestaurantContainer;