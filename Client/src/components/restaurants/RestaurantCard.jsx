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
  Image,
  Spacer,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
import generateImages from "../../hooks/getRandomStoreFrontImages";
import StarIcon from "../starRating/StarIcon";
import {
  faStar as faStarOutlined,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

/**
 * only renders limited info on a restaraunt
 *
 *RestaurantCardList will hand down the info of what to render
 *
 */

const RestaurantCard = ({ restaurant }) => {
  // I did it at this level so i didnt have to loop on every api request. TBD if i leave this in here seems weird
  const image =  generateImages.randomImage(generateImages.images) 
  const avgRating =  restaurant.averageRating %1 ==0? Math.trunc(restaurant.averageRating) :Math.round( (restaurant.averageRating) * 100) / 100

  // TO DO ADD IMAGE TO BACK DROP
  return (
    <Card maxW="md" height={"30rem"}>
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" flexWrap="wrap">
            <Box>
              <Heading size="sm">{restaurant.restaurantsName}</Heading>
            </Box>
           
            
            
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody overflow={"hidden"} padding={0}>
        <Image
          src={image}
          objectFit="cover"
          height={"100%"}
          width={"100%"}
        />
      </CardBody>
      <hr></hr>
      <CardFooter justifyContent={"space-between"}>
        <ChakraLink as={ReactRouterLink} to={`/restaurants/${restaurant.id}`}>
        Read More
         
        </ChakraLink>
        <Box top={0} right={0} >
                  { restaurant.userVotes==0 ? <Text>Unrated</Text> : <Flex top={0} right={0}> <Box>  {avgRating}</Box><StarIcon fillValue={faStarSolid}/> <Text> {restaurant.userVotes + " votes"}</Text></Flex>}
            </Box>
      </CardFooter>
    </Card>
  );
};

RestaurantCard.proptypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    restaurantsName: PropTypes.string,
    addressLocation: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
    priceRange: PropTypes.number,
  }),
};

export default RestaurantCard;
