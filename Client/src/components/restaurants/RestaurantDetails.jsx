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
import CommentForm from "../forms/CommentForm";
import CommentContainerList from "../comments/CommentContainerList"
/**
 * 
 * SOMEHOw add reviews and like functionality
 *
 *Should handle getting comments
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
  console.log("res", restaurant)
  return (
    <div className="Restaurant card">
      <div className="card-body">
        <ChakraLink as={ReactRouterLink} to="/">press here</ChakraLink>
       {/* {user.id ? <FavoriteButton userId={user.id} restaurantId={id} isFavorited={isFavorited}/>: null }  */}
       <FavoriteButton  restaurantId={id} isFavorited={restaurant.user? restaurant.user.favorited : false} isLoggedin={restaurant.user}/>
       {/*only renders total User Population votes*/ }
       <PriceIconContainer usersPrice={restaurant.generalUsers.averagePrice}/> 
      <StarRatingContainer restaurantId={id} rating={restaurant.generalUsers.averageRating}/>
      {/**terneary the bottom thing ig is no user allows hover but no vote */}
      <StarVotesContainer restaurantId={id} rating={ restaurant.user && restaurant.user.rating ? restaurant.user.rating : null } />
        <h6 className="card-title">{restaurant.restaurant.restaurantsName} </h6>
      </div>
      <CommentForm restaurantId={id}/>
      <CommentContainerList comments={restaurant.generalUsers.allParentComments } restaurantId={id}/>
  
    </div>
  );
};

export default RestaurantDetails;
