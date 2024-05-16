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
import UserContext from "../../auth/UserContext";

// restaurantDetails -> CommentList -> CommentContainer -> CommentCard
const CommentContainer = ({ comment, restaurantId }) => {
  // maybe doesnt render comment go one more deeper for comment card
  // container handles reply see replies and layout of container
  // replies renders a comment form
  // need some barreir to edit prob need user context here
  const user = useContext(UserContext).user;
  const [reply, setReply] = useState(false);
  const [seeRepliesState, setSeeRepliesState] = useState([]);
  const [toggleSeeReplies, setToggleSeeReplies] = useState(true);
  const [editComment, setEditComment] = useState(false);

  function replying(evt) {
    evt.preventDefault();
    setReply(!reply);
  }

  async function seeReplies(parentId, restaurantId) {
    const result = await yelpAPI.seeReplies({ parentId, restaurantId });
    setSeeRepliesState([...result]);
    setToggleSeeReplies(!toggleSeeReplies);
  }

  function editing(evt) {
    evt.preventDefault();
    setEditComment(!editComment);
  }

  //iconconatiner and function
  const buttonContainers =
    user.id && comment.userId == user.id ? (
      <>
        <Button onClick={replying}>reply</Button>
        <Button onClick={editing}>edit</Button>
      </>
    ) : user.id ? (
      <Button onClick={replying}>reply</Button>
    ) : null;

  //     comment.userId == user.id?
  //     <>
  //     <Button onClick={replying}>reply</Button>
  //     <Button onClick={editing}>edit</Button>
  //  </>: null);
  return (
    <>
      {!editComment ? (
        <CommentCard comment={comment} />
      ) : (
        <CommentForm
          restaurantId={restaurantId}
          commentMessage={comment.commentMessage}
          edit={editComment}
          commentId={comment.commentId}
        />
      )}
      {/* <CommentCard comment={comment} /> */}
      {buttonContainers}
      {reply ? (
        <CommentForm
          restaurantId={restaurantId}
          parentId={comment.commentId}
          cancelReply={replying}
        />
      ) : null}
      {seeReplies.length == 0 ? null : (
        <CommentContainerList
          comments={seeRepliesState}
          restaurantId={restaurantId}
        />
      )}

      {/* this should be seperate from body*/}
      {toggleSeeReplies ? (
        <Button
          onClick={(evt) => {
            evt.preventDefault();
            seeReplies(comment.commentId, restaurantId);
          }}
        >
          see replies
        </Button>
      ) : null}
    </>
  );
};

export default CommentContainer;
