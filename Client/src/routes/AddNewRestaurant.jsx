import React from "react";
import AddRestaurantForm from "../components/forms/AddRestaurantsForm";
import { Route } from "react-router-dom";

const addNewRestaurant = () =>{
  return (
    <div className = "addNewRestaurant">
      <AddRestaurantForm/>
    </div>
  )
}

export default addNewRestaurant