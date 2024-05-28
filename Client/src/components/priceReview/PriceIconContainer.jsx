import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";
import PriceIcon from "./PriceIcon";
import { Stack, HStack, VStack, Box } from "@chakra-ui/react";

//This container renders out price icon as dummy vafriable
const PriceIconContainer = ({ usersPrice }) => {
  const priceRows = [];
  for (let ind = 0; ind < Math.round(usersPrice); ind++) {
    priceRows.push(<PriceIcon key={uuidv4()} />);
  }
  const priceIconContainer = (
    <HStack spacing="20px" zIndex={50} top={"70%"} ml={"5%"} pos="absolute">
      {priceRows}
    </HStack>
  );

  return <>{priceIconContainer}</>;
};

export default PriceIconContainer;
