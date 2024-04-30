import React, { useState } from "react";
import yelpAPI from "../../api";
import { Box, Flex, Button, Textarea } from "@chakra-ui/react";

// form should really handle only state to text submission/repluying will be handled by a parent?

// restaurantDetails -> CommentCardList -> CommentContainer -> CommentCard
// is reply or parent maybe a prop?
const CommentForm = ({ restaurantId, parentId = null, cancelReply = null }) => {
  const [comment, setComment] = useState("");
  // button comes from somehwwree else. button should be its owb thing
  //  if not user do something else
  async function handleSubmit(evt) {
    evt.preventDefault();
    const cleaned_comment = comment.trim();
    if (cleaned_comment.length == 0) {
      //should redirect to login page
      return;
    }
    // send data with everything this just sends comment
    const data = {
      commentMessage: cleaned_comment,
      restaurantId,
      parentId,
    };
    await yelpAPI.commentingOrReplying(data);
    setComment("");
  }

  /** Update form fields */
  function handleChange(evt) {
    evt.preventDefault();
    setComment(evt.target.value);
  }

  return (
    <div className="CommentForm">
      <Box>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Textarea
              placeholder="Comment"
              type="text"
              name="comment"
              className="form-control"
              value={comment}
              onChange={handleChange}
            />
          </div>

          <Button
            mt={4}
            color={"red"}
            type="submit"
            className="btn btn-primary float-right"
            onSubmit={handleSubmit}
          >
            Submit
          </Button>

          {cancelReply ? (
            <Button onClick={cancelReply}>Cancel</Button>
          ) : (
            cancelReply
          )}
        </form>
      </Box>
    </div>
  );
};

export default CommentForm;