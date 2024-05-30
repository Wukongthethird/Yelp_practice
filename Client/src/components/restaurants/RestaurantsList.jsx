import React, { useEffect, useState } from "react";
import yelpAPI from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import SearchForm from "../forms/SearchForm";
import RestaurantCardList from "./RestaurantCardList";
import { SimpleGrid, Container, Box, Button } from "@chakra-ui/react";

/**
 * on mount should load list of restaraunts
 * will reload on future search form
 *
 * RestaurantList -> RestaurantCardList -> RestaurantCard
 * /routed at homes for now
 */
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null,
  });

  useEffect(function getAllRestaurantsOnMount() {
    handleOnClickPosts(variables);
  }, []);

  async function handleOnClickPosts(variables) {
    let results = await yelpAPI.getNewRestaurants(variables);
    setRestaurants([...restaurants, ...results.restaurants]);
    setHasMore(results.hasMore);

    if (restaurants.length) {
      setVariables({
        ...variables,
        cursor: restaurants[restaurants.length - 1].id,
      });
    }
  }

  /** Triggered by search form submit; reloads restaurants. */
  async function search(restaurantsName) {
    if (!restaurantsName) {
      setVariables({
        limit: 15,
        cursor: null,
      });
      return handleOnClickPosts(variables);
    }
    let restaurants = await yelpAPI.getAllRestaurants(restaurantsName);
    setRestaurants(restaurants);
    setHasMore(false);
  }
  console.log(restaurants)

  return (
    <Box marginTop={0} mx={"auto"} marginBottom={"5rem"}>
      <SearchForm searchFor={search} />
      {restaurants[0] !== null ? (
        <RestaurantCardList restaurants={restaurants} />
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}

      {hasMore ? (
        <Box marginTop={0} mx={"auto"} marginTop={"5rem"}>
        <Button
          marginTop={"25px"}
          position={"relative"}
          // transform={"translateX(-50%"}
          onClick={(evt) => {
            evt.preventDefault();
            handleOnClickPosts(variables);
          }}
        >
          Load More
        </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default RestaurantList;
