import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";
import StarIcon from "./StarIcon";
import { Stack, HStack, VStack, Box, Flex } from "@chakra-ui/react";
import { faStar as faStarOutlined , faStarHalfStroke} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";



//user ansd average variable useleess most likely
const StarRatingContainer = ({ rating  }) => {

  // need a state to check if voted or not
  // renders all 5 clickable as rating system on hover?

  const starIcons = []

  //parent restauarant details will have  to manage which rating conatiners

  let count =  rating;
  for (let ind = 1; ind < 6; ind++) {
    if (count <= 0.25) {
      starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarOutlined} size={"xl"} />);
    }
    if (count < 0.65 && count > 0.25) {
      starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarHalfStroke}  size={"xl"} />);
      count = 0;
    }
    if (count >= 0.65) {
      starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarSolid} size={"xl"} />);
      count--;
    }
  }
    
  
  // jave some bg color light up if on hover permentaly lock in the hover if have voted
  const starIconContainer = (
    <HStack spacing ='20px' pos={"absolute"} top={["80%", "80%","75%", "75%", "70%", "70%" ]} zIndex={50}  >
       {starIcons}
    </HStack>
  );

  return <>{starIconContainer}</>;
};

export default StarRatingContainer;