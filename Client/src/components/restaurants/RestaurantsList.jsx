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

  useEffect(
    function updateVariable() {
      setVariables({
        ...variables,
        cursor: restaurants.length
          ? restaurants[restaurants.length - 1].id
          : null,
      });
    },
    [restaurants]
  );

  async function handleOnClickPosts(variables) {
    let results = await yelpAPI.getNewRestaurants(variables);
    setRestaurants([...restaurants, ...results.restaurants]);
    setHasMore(results.hasMore);
  }

  /** Triggered by search form submit; reloads restaurants. */
  async function search(restaurantsName) {
    if (!restaurantsName) {
      let results = await yelpAPI.getNewRestaurants({
        limit: 15,
        cursor: null,
      });
      setRestaurants([...results.restaurants]);
      setHasMore(results.hasMore);

      return;
    }
    let restaurants = await yelpAPI.getAllRestaurants(restaurantsName);
    setRestaurants(restaurants);
    setHasMore(false);
  }

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
