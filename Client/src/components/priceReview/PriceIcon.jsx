import React, { useState, useEffect } from "react";
import yelpAPI from "../../api";
import { v4 as uuidv4 } from "uuid";

import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHandHoldingDollar  } from "@fortawesome/free-regular-svg-icons";
import { faHandHoldingDollar  } from "@fortawesome/free-solid-svg-icons";


const PriceIcon = () => {

  // function comes from conatiner
  
  const priceIcon =  (
    <FontAwesomeIcon
      aria-hidden="true"
      icon={faHandHoldingDollar} 
      size="2x"
      color="orange"

    />
  )

  return <>{priceIcon}</>;
};

export default PriceIcon;