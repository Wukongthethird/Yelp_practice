import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";

import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";


const PriceVotingButton = ({ restaurantId  }) => {

  const priceVoting =  (
    <FontAwesomeIcon
    key={uuidv4()}
      aria-hidden="true"
      icon={faStarOutline } // this needs to be updated in the icon and not as a variable outside
      size="4x"
      onClick={(evt)=>{
        evt.preventDefault()
      }}
    />
  )

  return <>{priceVoting}</>;
};

export default PriceVotingButton;