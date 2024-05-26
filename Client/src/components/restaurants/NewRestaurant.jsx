import React, { useEffect, useState } from "react";
import yelpAPI from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import { SimpleGrid, Container, Box } from "@chakra-ui/react";
import NewRestaurantContainer from "./newRestaurantContainer";

/**
 * on mount should load list of restaraunts
 * will reload on future search form
 *
 * RestaurantList -> RestaurantCardList -> RestaurantCard
 * /routed at homes for now
 */
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(function getNewRestaurantsOnMount() {
    console.debug("RestaurantsList useEffect getAllRestaurantsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads restaurants. */
  async function search(page) {
    let restaurants = await yelpAPI.getNewRestaurants(page);
    setRestaurants(restaurants);
  }

  if (!restaurants) return <LoadingSpinner />;

  return (
    < Box marginTop={0}>
    

        <NewRestaurantContainer restaurants={restaurants} />
      
    </Box>
  );
};

export default RestaurantList;
