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

  return (
    

          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name='Hung Bro' src='https://bit.ly/sage-adebayo' />
            <Box flex="1" gap="4" alignItems="left" flexWrap="wrap">
            <Heading size="sm" textAlign={"left"}>{comment.firstName +" " + comment.lastName}</Heading>
              <Heading size="sm">{comment.commentMessage}</Heading>
            </Box>
          </Flex>

      
  );
};

export default CommentCard;
