import React, { useState, useEffect } from "react";
import yelpAPI from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import RestaurantList from "../components/restaurants/RestaurantsList";
import SearchForm from "../components/forms/SearchForm";
import { useNavigate } from "react-router-dom";
import {Navbar} from "../components/Navbar.jsx"


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
  const navigate = useNavigate();

  async function logout() {
    console.log("logout");
    const res = await yelpAPI.logout();
    navigate("/login");
    console.log(res);
  }

  if (!restaurants) return <LoadingSpinner />;

  console.log("done", restaurants);

  return (

    <div>
      <Navbar/>
      <button onClick={logout}>LogOut</button>
      <RestaurantList />
    </div>
  );
};

export default Home;
