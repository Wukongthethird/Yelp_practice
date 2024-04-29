import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CommentContainer from "./CommentContainer";

// restaurantDetails -> CommentList -> CommentContainer -> CommentCard
const CommentCardList = ({ comments, restaurantId }) => {
  console.log("comments" , comments)
  return (
    <>
      {comments.map((comment) => {
        return (
          <Box key={uuidv4()}>
            <CommentContainer key={uuidv4()} comment={comment} restaurantId={restaurantId}/>
          </Box>
        );
      })}
      </>
  );
};

//https://www.geeksforgeeks.org/react-proptype-array-with-shape/
//https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
// CommentCardList.propTypes = {
//   restaurants: PropTypes.arrayOf(
//     PropTypes.shape({
//       restaurants_name: PropTypes.string,
//       address_location: PropTypes.string,
//       city: PropTypes.string,
//       zipcode: PropTypes.string,
//       price_range: PropTypes.number,
//     })
//   ),
// };

export default CommentCardList;
