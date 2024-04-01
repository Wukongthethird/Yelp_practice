import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import FavoriteButton  from "../favorites/FavoriteButton";
import UserContext from "../../auth/UserContext";

/**
 * 
 * SOMEHOw add reviews and like functionality
 *
 *RestaurantCardList will hand down the info of what to render
 *
 */



const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    console.log("component rerendered");
  });
  console.log("res", restaurant)


  useEffect(function getRestaurantByID() {
    async function getRestaurant() {
      setRestaurant(await yelpAPI.getRestaurantByID(id));
    }
    getRestaurant();
  }, []);


  if(!restaurant) return <LoadingSpinner/>
  return (
    <div className="Restaurant card">
      <div className="card-body">
        <ChakraLink as={ReactRouterLink} to="/">press here</ChakraLink>
       {/* {user.id ? <FavoriteButton userId={user.id} restaurantId={id} isFavorited={isFavorited}/>: null }  */}
       <FavoriteButton  restaurantId={id} isFavorited={false}/>
        <h6 className="card-title">{restaurant.restaurants_name} </h6>
      </div>
    </div>
  );
};

export default RestaurantDetails;
