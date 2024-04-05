import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";
import StarIcon from "./StarIcon";
import { Stack, HStack, VStack, Box, Flex } from "@chakra-ui/react";
import {
  faStar as faStarOutlined,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import StarRatingContainer from "./StarRatingContainer";

const StarVotesContainer = ({ restaurantId, rating = null }) => {
  // need a state to check if voted or not
  // renders all 5 clickable as rating system on hover?
  const [voted, setVoted] = useState(rating);
  const [hoverStatus, setHoverStatus] = useState(0);

  async function handleRating(restaurantId, voteValue) {
    const res = await yelpAPI.rating({ restaurantId, voteValue });
    if (res.msg == "voted") {
      setVoted(voteValue);
    }
  }

  function hoverOver(ind) {
    setHoverStatus(ind);
  }

  function leaveHover() {
    setHoverStatus(0);
  }

  const starIconsUnvoted = [];

  if (!voted) {
    for (let ind = 1; ind < 6; ind++) {
      starIconsUnvoted.push(
        <StarIcon
          key={uuidv4()}
          restaurantId={restaurantId}
          fillValue={hoverStatus < ind ? faStarOutlined : faStarSolid}
          voteValue={ind}
          voteFunction={handleRating}
          hoverOver={hoverOver}
          leaveHover={leaveHover}
        />
      );
    }
  }

  // const starIcons = [];
  // renders out stars on how much was rated

  // if (voted) {
  //   let count = rating;
  //   for (let ind = 1; ind < 6; ind++) {
  //     if (count < 0.25) {
  //       starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarOutlined} />);
  //     }
  //     if (count < 0.65 && count > 0.25) {
  //       starIcons.push(
  //         <StarIcon key={uuidv4()} fillValue={faStarHalfStroke} />
  //       );
  //       count = 0;
  //     }
  //     if (count >= 0.65) {
  //       starIcons.push(<StarIcon key={uuidv4()} fillValue={faStarSolid} />);
  //       count--;
  //     }
  //   }
  // }

  // jave some bg color light up if on hover permentaly lock in the hover if have voted
  const starIconContainer = 
  voted ? <StarRatingContainer rating={voted} />
  : starIconsUnvoted

  // const starIconContainer = 
  // (

  //   // <HStack spacing="20px">{voted ? starIcons : starIconsUnvoted}</HStack>
  //       <HStack spacing="20px">{starIconsUnvoted}</HStack>
  // );

  return <> <HStack spacing="20px">{starIconContainer} </HStack></>;
};

export default StarVotesContainer;
