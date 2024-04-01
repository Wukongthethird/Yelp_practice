import React, { useState } from "react";
import yelpAPI from "../../api";
import { useContext } from "react";
// import UserContext from "../../auth/UserContext";
import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../auth/UserContext";

// {userId, restaurantId}
const FavoriteButton = ({restaurantId, isFavorited }) => {
  
  


  const [favoriteStatus , setFavoriteStatus] = useState( isFavorited ) // this should control the state of the button/ maybe just color of button

 async function favoriting(restaurantId){
  await yelpAPI.favoriting({restaurantId});
  setFavoriteStatus(!favoriteStatus)
 }

  // const favoriteButton = isFavorited ? (
  //   <FontAwesomeIcon
  //     aria-hidden="true"
  //     icon={faHeartFilled}
  //     size="4x"
  //     onClick={(evt) => {
  //       evt.preventDefault();
  //       favoriting(restaurantId);
  //     }}
  //   />
  // ) : (
  //   <FontAwesomeIcon
  //     aria-hidden="true"
  //     icon={faHeartOutline}
  //     size="4x"
  //     onClick={(evt) => {
  //       evt.preventDefault();
  //       favoriting(restaurantId);
  //     }}
  //   />
  // );

  const favoriteIcon = isFavorited ? faHeartFilled : faHeartOutline

  const favoriteButton =  (
    <FontAwesomeIcon
      aria-hidden="true"
      icon={favoriteIcon}
      size="4x"
      onClick={(evt)=>{
        evt.preventDefault()
        favoriting(restaurantId)}}
    />
  ) 

  return <>{favoriteButton}</>;
};

export default FavoriteButton;
