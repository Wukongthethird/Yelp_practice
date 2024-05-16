import React, { useState, useEffect } from "react";
import yelpAPI from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import RestaurantList from "../components/restaurants/RestaurantsList";
import SearchForm from "../components/forms/SearchForm";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Home = () => {
  const [restaurants, setRestaurants] = useState(null);

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
    <div>
      <Navbar />
      <RestaurantList />
    </div>
  );
};

export default Home;
