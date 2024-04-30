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
import CommentForm from "../forms/CommentForm";
import CommentContainerList from "./CommentContainerList";

// restaurantDetails -> CommentList -> CommentContainer -> CommentCard
const CommentContainer = ({ comment, restaurantId }) => {
  // maybe doesnt render comment go one more deeper for comment card
  // container handles reply see replies and layout of container
  // see replies is a function that render out another comment list?
  // replies renders a comment form
  const [reply, setReply] = useState(false);
  const [seeRepliesState, setSeeRepliesState] = useState([]);

  function replying(evt) {
    evt.preventDefault();
    setReply(!reply);
  }

  async function seeReplies(parentId, restaurantId) {
    const result = await yelpAPI.seeReplies({ parentId, restaurantId });
    setSeeRepliesState([...result])
  }

  return (
    <>
      <CommentCard comment={comment} />
      <Button onClick={replying}>reply</Button>
      {reply ? (
        <CommentForm
          restaurantId={restaurantId}
          parentId={ comment.commentId }
          cancelReply={replying}
        />
      ) : null}
      <Button
        onClick={(evt) => {
          evt.preventDefault();
          seeReplies(comment.commentId, restaurantId);
        }}
      >
        see replies
      </Button>
      {
        seeReplies.length ==0 ?null:
        <CommentContainerList comments={seeRepliesState} restaurantId={restaurantId} />
      }
    </>
  );
};

export default CommentContainer;
