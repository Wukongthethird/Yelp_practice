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
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link as ChakraLink,
  AvatarBadge,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import yelpAPI from "../../api";
import CommentForm from "../forms/CommentForm";
import CommentContainerList from "./CommentContainerList";
import UserContext from "../../auth/UserContext";
import { motion } from "framer-motion";

// restaurantDetails -> CommentList -> CommentContainer
const CommentContainer = ({ comment, restaurantId, ml = 0 }) => {
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
        <Button variant={"ghost"} onClick={replying}>
          reply
        </Button>
        <Button variant={"ghost"} onClick={editing}>
          edit
        </Button>
      </>
    ) : user.id ? (
      <Button variant={"ghost"} onClick={replying}>
        reply
      </Button>
    ) : null;

  return (
    <Card maxW={"50rem"}>
      <CardBody>
        {!editComment ? (
          <Box flex="1" gap="4" alignItems="center" flexWrap="wrap">

            <Flex marginBottom={"2rem"}>
              <Avatar name="Hung Bro" src="https://bit.ly/sage-adebayo">
                <AvatarBadge placement="top-start" />
              </Avatar>
              <Box ml={"5px"} mt={"10px"}>
                <Heading size="md" textAlign={"left"} top={0}>
                  {comment.firstName + " " + comment.lastName}
                </Heading>
              </Box>
              
            </Flex>

            <Box flex="1" gap="4" alignItems="left" flexWrap="wrap">
              <Text textAlign={"left"} size="sm" color="gray.500">
                {comment.commentMessage}
              </Text>
            </Box>
          </Box>
        ) : (
          <CommentForm
            restaurantId={restaurantId}
            commentMessage={comment.commentMessage}
            edit={editComment}
            commentId={comment.commentId}
          />
        )}
        <hr></hr>
      </CardBody>
      <Flex>
        {buttonContainers}
        {toggleSeeReplies ? (
          <Button
            size={"md"}
            variant={"ghost"}
            onClick={(evt) => {
              evt.preventDefault();
              seeReplies(comment.commentId, restaurantId);
            }}
          >
            see replies
          </Button>
        ) : null}
      </Flex>
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
          ml={ml + 3}
        />
      )}

      {/* this should be seperate from body*/}
    </Card>
  );
};

export default CommentContainer;
