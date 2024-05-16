import React, { useEffect, useState } from "react";
import yelpAPI from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import SearchForm from "../forms/SearchForm";
import RestaurantCardList from "./RestaurantCardList";
import { SimpleGrid, Container } from "@chakra-ui/react";

/**
 * on mount should load list of restaraunts
 * will reload on future search form
 *
 * RestaurantList -> RestaurantCardList -> RestaurantCard
 * /routed at homes for now
 */
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(function getAllRestaurantsOnMount() {
    console.debug("RestaurantsList useEffect getAllRestaurantsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads restaurants. */
  async function search(restaurantsName) {
    let restaurants = await yelpAPI.getAllRestaurants(restaurantsName);
    setRestaurants(restaurants);
  }

  if (!restaurants) return <LoadingSpinner />;

  return (
    < >
      <SearchForm searchFor={search} />
      {restaurants[0] !== null ? (
        <RestaurantCardList restaurants={restaurants} />
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </>
  );
};

export default RestaurantList;
