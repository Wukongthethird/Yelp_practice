import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
/**
 * only renders limited info on a restaraunt
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
  console.log("restauya, ", restaurant)


  return (
    <div className="Restaurant card">
      <div className="card-body">
        <h6 className="card-title">{restaurant.restaurants_name} </h6>
      </div>
    </div>
  );
};

export default RestaurantDetails;
