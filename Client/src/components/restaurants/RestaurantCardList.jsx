import React from "react";
import RestaurantCard from "./RestaurantCard";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Box, SimpleGrid } from "@chakra-ui/react";

const RestaurantCardList = ({ restaurants }) => {
  return (
    <SimpleGrid columns={[1, 2, null, null, 3]} spacing="40px">
      {restaurants.map((restaurant) => {
        return (
          <Box key={uuidv4()}>
            <RestaurantCard key={uuidv4()} restaurant={restaurant} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

//https://www.geeksforgeeks.org/react-proptype-array-with-shape/
//https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
RestaurantCardList.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      restaurants_name: PropTypes.string,
      address_location: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
     
    })
  ),
};

export default RestaurantCardList;
