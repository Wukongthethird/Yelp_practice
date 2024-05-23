import React, { useState, useEffect } from "react";
import yelpAPI from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import RestaurantList from "../components/restaurants/RestaurantsList";
import SearchForm from "../components/forms/SearchForm";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Carousel from "../components/Carousel";
import { Image, VStack, Box } from "@chakra-ui/react";

const Home = () => {
  const [restaurants, setRestaurants] = useState(null);
  const images = [
    "/pexels-adrienn-638530-1537635.jpg",
    "/pexels-asadphoto-1449773.jpg",
    "/pexels-pixabay-460537.jpg",
    "/pexels-pixabay-262978.jpg",
  ];
  useEffect(function getAllRestaurantsOnMount() {
    console.debug("restaurants useEffect getallrestauranrs");
    getAllrestaurants();
  }, []);

  async function getAllrestaurants() {
    let restaurants = await yelpAPI.getAllRestaurants();
    setRestaurants(restaurants);
  }

  if (!restaurants) return <LoadingSpinner />;

  return (
    <>
      <Box maxW={"75rem"}  margin={" 0 auto"}>
        <Carousel data={images} />
      </Box>
      <RestaurantList />
    </>
  );
};

export default Home;
