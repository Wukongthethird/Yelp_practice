import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";

import { IconButton, Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarOutlined,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {
 * fillValue , which icon
 * restaurantId
 * voteValue index 1-5  for function
 * voteFunciton handles submit of rating
 * hover Funciton to hover
 * } param0
 */
const StarIcon = ({
  restaurantId = null,
  voteValue = null,
  voteFunction = null,
  fillValue = null,
  hoverOver = null,
  leaveHover=null

}) => {



  const starIcon = voteValue ? (
    <FontAwesomeIcon
      aria-hidden="true"
      icon={fillValue}
      size="2x"
      onMouseEnter={()=> hoverOver(voteValue)}
      onMouseLeave={leaveHover}
      onClick={(evt) => {
        evt.preventDefault();
     
        voteFunction(restaurantId, voteValue);
      }}
    />
  ):(
<FontAwesomeIcon
      aria-hidden="true"
      icon={fillValue}
      size="2x"
    />
  );


  return <>{starIcon}</>;
};

export default StarIcon;