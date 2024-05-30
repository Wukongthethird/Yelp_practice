import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CommentContainer from "./CommentContainer";

// restaurantDetails -> CommentList -> CommentContainer 
const CommentContainerList = ({ comments, restaurantId, ml=0 }) => {
  let minMl = Math.min(40,ml)
  return (
    <>
      {comments.map((comment) => {
        return (
          <Box key={uuidv4()} ml={minMl+"rem"}>
            <CommentContainer key={uuidv4()} comment={comment} restaurantId={restaurantId}/>
          </Box>
        );
      })}
      </>
  );
};



export default CommentContainerList;
