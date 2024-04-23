import React, { useState } from "react";
import yelpAPI from "../../api";
import {
  Box,
  Flex,
  Button,
  InputRightElement,
  InputGroup,
  Input,
} from "@chakra-ui/react";

// form should really handle only state to text submission/repluying will be handled by a parent?

// is reply or parent maybe a prop?
const CommentForm = () => {
  const [comment, setComment] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    const cleaned_comment = comment.trim();
    if (cleaned_comment.length == 0) {
      return;
    }
    await yelpAPI.commentingOrReplying(cleaned_comment);
    setComment(cleaned_comment);
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
            <Input
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
        </form>
      </Box>
    </div>
  );
};

export default CommentForm;
