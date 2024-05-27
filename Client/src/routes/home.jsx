import React, { useState, useEffect } from "react";
import yelpAPI from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import RestaurantList from "../components/restaurants/RestaurantsList";
import SearchForm from "../components/forms/SearchForm";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Carousel from "../components/Carousel";
import { Image, VStack, Box } from "@chakra-ui/react";
import photo1 from "../photos/photo1.jpg"
import photo2 from "../photos/photo2.jpg"
import photo3 from "../photos/photo3.jpg"
import photo4 from "../photos/photo4.jpg"
import photo5 from "../photos/photo5.jpg"



const Home = () => {
  const [restaurants, setRestaurants] = useState(null);

  const images = [
    photo1,photo2,photo3,photo4,photo5
  ];
  // useEffect(function getAllRestaurantsOnMount() {
  //   console.debug("restaurants useEffect getallrestauranrs");
  //   getAllrestaurants();
  // }, []);

  // async function getAllrestaurants() {
  //   let restaurants = await yelpAPI.getAllRestaurants();
  //   setRestaurants(restaurants);
  // }

  // if (!restaurants) return <LoadingSpinner />;

  return (
    <>
      <Carousel data={images} />
      <Box maxW={"75rem"} margin={"0 auto"}>
        <RestaurantList />
      </Box>

      {/* <NewRestaurant/> */}
    </>
  );
};

export default Home;
