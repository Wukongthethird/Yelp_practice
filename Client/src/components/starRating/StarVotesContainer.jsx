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
  const [voted, setVoted] = useState(rating);
  const [hoverStatus, setHoverStatus] = useState(0);

  async function handleRating(restaurantId, voteValue) {
    if (rating) {
      // maybe redirect to login page
      return;
    }
    const res = await yelpAPI.rating({ restaurantId, voteValue });
    if (res.err) {
      return;
    }
    setVoted(voteValue);
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

  // jave some bg color light up if on hover permentaly lock in the hover if have voted
  const starIconContainer = voted ? (
    <StarRatingContainer rating={voted} />
  ) : (
    <HStack spacing="20px">{starIconsUnvoted}</HStack>
  );

  return <> {starIconContainer} </>;
};

export default StarVotesContainer;
