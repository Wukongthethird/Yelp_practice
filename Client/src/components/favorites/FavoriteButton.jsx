import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";

import { IconButton, Box , Flex} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";

// {userId, restaurantId}
const FavoriteButton = ({ restaurantId, isFavorited ,isLoggedin=false}) => {
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorited); // this should control the state of the button/ maybe just color of button
  
  async function favoriting(restaurantId) {
    await yelpAPI.favoriting({ restaurantId });
    setFavoriteStatus(!favoriteStatus);
  }

  const favoriteButtonLoggedIn =  (
    <Flex>
    <Box  bg='red.600'>
    <FontAwesomeIcon
    key={uuidv4()}
      aria-hidden="true"
      icon={favoriteStatus ?faHeartFilled :faHeartOutline } // this needs to be updated in the icon and not as a variable outside maybe should be useeffect
      size="4x"
      onClick={(evt)=>{
        evt.preventDefault()
        favoriting(restaurantId)}}
    />
    </Box>
    </Flex>
  )

  const favoriteButtonLoggedOut =  (
    <Flex>
    <Box  bg='red.600'>
    <FontAwesomeIcon
    key={uuidv4()}
      aria-hidden="true"
      icon={faHeartOutline } // this needs to be updated in the icon and not as a variable outside
      size="4x"
    />
    </Box>
    </Flex>
  )


  return <>{isLoggedin? favoriteButtonLoggedIn: favoriteButtonLoggedOut }</>;
};

export default FavoriteButton;
