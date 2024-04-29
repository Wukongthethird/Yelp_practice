import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Avatar,
  Heading,
  Text,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom'
import PropTypes from "prop-types";
import yelpAPI from "../../api";

/**
 * only renders limited info on a restaraunt
 *
 *RestaurantCardList will hand down the info of what to render
 *
 */

 // restaurantDetails -> CommentCardList -> CommentContainer -> CommentCard
const CommentCard = ({ comment }) => {
  // I did it at this level so i didnt have to loop on every api request. TBD if i leave this in here seems weird


 // TO DO ADD IMAGE TO BACK DROP
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {/* <Avatar name='Hung Bro' src='https://bit.ly/sage-adebayo' /> */}
            <Box>
              <Heading size="sm">{comment.commentMessage}</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
  </CardBody>
    </Card>
  );
};

export default CommentCard;
