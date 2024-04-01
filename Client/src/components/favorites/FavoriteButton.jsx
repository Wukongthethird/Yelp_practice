import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";

import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";

// {userId, restaurantId}
const FavoriteButton = ({ restaurantId, isFavorited }) => {
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorited); // this should control the state of the button/ maybe just color of button
  const favoriteIcon = isFavorited ? faHeartFilled : faHeartOutline;
  
  async function favoriting(restaurantId) {
    await yelpAPI.favoriting({ restaurantId });
    setFavoriteStatus(!favoriteStatus);
  }

  // const favoriteButton = isFavorited ? (

  //     <FontAwesomeIcon
  //       aria-hidden="true"
  //       icon={faHeartFilled}
  //       size="4x"
  //       onClick={(evt) => {
  //         evt.preventDefault();
  //         favoriting(restaurantId);
  //       }}
  //     />
  // ) : (
  //     <FontAwesomeIcon
  //       aria-hidden="true"
  //       icon={faHeartOutline}
  //       size="4x"
  //       onClick={(evt) => {
  //         evt.preventDefault();
  //         favoriting(restaurantId);
  //       }}
  //     />

  // );

  // let favoriteIcon = isFavorited ? faHeartFilled : faHeartOutline
  const favoriteButton =  (
    <FontAwesomeIcon
    key={uuidv4()}
      aria-hidden="true"
      icon={favoriteStatus ?faHeartFilled :faHeartOutline }
      size="4x"
      onClick={(evt)=>{
        evt.preventDefault()
        favoriting(restaurantId)}}
    />
  )

  return <>{favoriteButton}</>;
};

export default FavoriteButton;
