import React, { useContext, useState } from "react";
import PropTypes from "prop-types"

/**
 * only renders a restaraunt on a lsit of restaurant
 *
 *
 *
 */

function RestaurantCard({restaurant}) {

  return(
    <div className="Restaurant card">
      <div className="card-body">
        <h6 className="card-title">{restaurant.restaurants_name} </h6>

      </div>
    </div>

  )

}

RestaurantCard.proptypes ={
  restaurant: PropTypes.shape({
    restaurants_name: PropTypes.string,
      address_location: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
      price_range: PropTypes.number
  })
}



export default RestaurantCard;