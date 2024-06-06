import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Progress, Spacer } from "@chakra-ui/react";
import StarRatingContainer from "./StarRatingContainer";
import { v4 as uuidv4 } from "uuid";

const RatingGraph = ({ ratingData, totalRating }) => {
  let cumalitiveVote = 0;

  for (let n in ratingData) {
    cumalitiveVote += +n * +ratingData[n];
  }

  const avgRating = cumalitiveVote / totalRating;
  const avgRatingRounded =
    avgRating % 1 == 0
      ? Math.trunc(avgRating)
      : Math.round(avgRating * 100) / 100;

  const graphBody = [5, 4, 3, 2, 1].map((rd) => (
    <Flex key={uuidv4()}>
      <Box key={uuidv4()} width={"10%"} top="0%" transform={"translateY(-30%)"}>
        {rd + " stars"}
      </Box>
      <Box key={uuidv4()} width="100%">
        <Progress
          colorScheme="red"
          borderRadius="1rem"
          value={ratingData[rd] ? (ratingData[rd] * 100) / totalRating : 0}
        />
      </Box>
    </Flex>
  ));

  const rating = totalRating ==0? 0 : avgRatingRounded

  return (
    <Flex width={"75rem"}>
      <Box>
        <Text>Overall Rating</Text>
        <Flex>
          <StarRatingContainer rating={rating} />
          <Box>{rating + " stars"}</Box>
        </Flex>
        <Text>{totalRating + " reviews"}</Text>
      </Box>

      <Box width="60rem">{graphBody}</Box>
    </Flex>
  );
};

export default RatingGraph;
