import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import FavoriteButton  from "../favorites/FavoriteButton";
import PriceIconContainer from "../priceReview/PriceIconContainer";
import UserContext from "../../auth/UserContext";
import StarRatingContainer from "../starRating/StarRatingContainer";
import StarVotesContainer from "../starRating/StarVotesContainer";
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
       <FavoriteButton  restaurantId={id} isFavorited={restaurant.user? restaurant.user.favorited : false} isLoggedin={restaurant.user}/>
       {/*only renders total User Population votes*/ }
       <PriceIconContainer usersPrice={restaurant.generalUsers.averagePrice}/> 
       {/* PriceVotingContaienr handles users submission of how expensive it is */}
      {/* <StarVotesContainer restaurantId={id} rating={restaurant.user? restaurant.user.rating: null}/> */}
      <StarVotesContainer restaurantId={id} rating={restaurant.generalUsers.averageRating}/>

        <h6 className="card-title">{restaurant.restaurant.restaurantsName} </h6>
      </div>
    </div>
  );
};

export default RestaurantDetails;
