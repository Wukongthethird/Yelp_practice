import React, { useContext, useState } from "react";
import {
  Button,
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
import { Link as ReactRouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
import CommentCard from "./CommentCard";
import CommentForm from  "../forms/CommentForm"

// restaurantDetails -> CommentList -> CommentContainer -> CommentCard
const CommentContainer = ({ comment, restaurantId}) => {
  // maybe doesnt render comment go one more deeper for comment card
  // container handles reply see replies and layout of container
  // see replies is a function that render out another comment list?
  // replies renders a comment form
  const [reply, setReply] = useState(false);
  const [seeRepliesState, setSeeRepliesState] = useState([]);

  function replying(evt){
    evt.preventDefault()
    setReply(!reply)
  }

  function seeReplies(evt){

  }


  return (
    <>
      <CommentCard comment={comment} />
      <Button onClick={replying}>reply</Button>
      {reply? <CommentForm restaurantId={restaurantId} parentId={comment.id} cancleReply={replying} />:null}
      <Button>see replies</Button>
      
    </>
  );
};

export default CommentContainer;
