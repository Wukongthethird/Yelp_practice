import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
/**
 * only renders limited info on a restaraunt
 *
 *RestaurantCardList will hand down the info of what to render
 *
 */

function RestaurantCard({ restaurant }) {
  const convertedRestaurant = {};
  for (let key in restaurant) {
    convertedRestaurant[yelpAPI.snakeToCamel(key)] = restaurant[key];
  }
  return (
    <div className="Restaurant card">
      <div className="card-body">
        <h6 className="card-title">{convertedRestaurant.restaurantsName} </h6>
      </div>
    </div>
  );
}

RestaurantCard.proptypes = {
  restaurant: PropTypes.shape({
    restaurantsName: PropTypes.string,
    addressLocation: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
    priceRange: PropTypes.number,
  }),
};

export default RestaurantCard;
