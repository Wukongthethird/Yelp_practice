import React, { useState } from "react";
import yelpAPI from "../../api";
import { useContext } from "react";
// import UserContext from "../../auth/UserContext";
import { IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHeart  as faHeartOutline } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons'






// {userId, restaurantId}
const FavoriteButton = ({userId, restaurantId})=>{
  

  // needs to handle the functionaliy if it is liked or not and flips if so
  function onClick({userId, restaurantId}){
    console.log(userId,restaurantId)
    const res = 

  }
    return(
      <>
      <FontAwesomeIcon aria-hidden="true" icon={faHeartOutline} onClick={onClick} size ='4x'/>
      <FontAwesomeIcon aria-hidden="true" icon={faHeartFilled} />
      </>
    )



}

export default FavoriteButton;