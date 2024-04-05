import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";
import StarIcon from "./StarIcon";
import { Stack, HStack, VStack, Box, Flex } from "@chakra-ui/react";
import { faStar as faStarOutlined , faStarHalfStroke} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";



//user ansd average variable useleess most likely
const StarRatingContainer = ({ rating = null }) => {

  // need a state to check if voted or not
  // renders all 5 clickable as rating system on hover?

 

  const starIcons = []

  //parent restauarant details will have  to manage which rating conatiners

  let count = rating;
  for (let ind = 1; ind < 6; ind++) {
    if (count <= 0.25) {
      starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarOutlined} />);
    }
    if (count < 0.65 && count > 0.25) {
      starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarHalfStroke} />);
      count = 0;
    }
    if (count >= 0.65) {
      starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarSolid} />);
      count--;
    }
  }
    
  
  // jave some bg color light up if on hover permentaly lock in the hover if have voted
  const starIconContainer = (
    <HStack spacing = '20px'>
       {starIcons}
    </HStack>
  );

  return <>{starIconContainer}</>;
};

export default StarRatingContainer;