import React from "react";
import RestaurantCard from "./RestaurantCard";
import PropTypes from "prop-types"
import { v4 as uuidv4 } from 'uuid'


function RestaurantCardList({restaurants}){
  console.log("rcl", restaurants)
  return(
    <div className="RestaurantCardList">
      
      {
        restaurants.map( (restaurant) =>{
          return (<RestaurantCard key={uuidv4()} restaurant={restaurant}/>)
        })
      }

    </div>
  )

}

//https://www.geeksforgeeks.org/react-proptype-array-with-shape/
//https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
RestaurantCardList.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      restaurants_name: PropTypes.string,
      address_location: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
      price_range: PropTypes.number
    })
  )
}


export default RestaurantCardList;
