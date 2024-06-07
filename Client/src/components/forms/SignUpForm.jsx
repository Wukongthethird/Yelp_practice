import React, { useState } from "react";
import Alert from "../Alert";
import yelpAPI from "../../api";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Box,
  InputGroup,
  Button,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";



import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();

  console.debug(
    "SignupForm",
    "signup=",
    typeof signup,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   *
   */

  console.log("formerror", formErrors)
  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await yelpAPI.signUpUser(formData);

    if (res.errors) {
      let msgs = [];
      for (let msg of res.errors) {
        msgs.push(msg.msg);
      }
      setFormErrors(msgs);
    } else {
      navigate("/login");
    }
  }


  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleShow(showState, setShowState) {
    setShowState(!showState);
  }

  const eyeIcon1 = show1 ? (
    <FontAwesomeIcon icon={faEye} />
  ) : (
    <FontAwesomeIcon icon={faEyeSolid} />
  );

  const eyeIcon2 = show2 ? (
    <FontAwesomeIcon icon={faEye} />
  ) : (
    <FontAwesomeIcon icon={faEyeSolid} />
  );

  return (
    <div className="SignUpForm">
      <Box mt={8} mx="auto" maxW="300px" w="100% " variant="floating">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <FormControl variant="floating" id="first-name"> */}
            <Input
              placeholder="First Name"
              type="firstName"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              // bg={"gray.200"}
              // variants={'floating'}
            />
            {/* <FormLabel>First Name</FormLabel>
            </FormControl> */}
            <Input
              placeholder="Last Name"
              type="lastName"
              name="lastName"
              className="form-control"
              value={formData.lastNameName}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <InputGroup>
              <Input
                // pr="4.5rem"
                placeholder="Password"
                type={show1 ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement top={"50%"} transform={"translateY(-50%)"}>
                <IconButton
                  margin={"auto"}
                  isRound={true}
                  icon={eyeIcon1}
                  padding={"EdgeInsets.zero"}
                  size={"s"}
                  onClick={() => {
                    handleShow(show1, setShow1);
                  }}
                >
                  {show1 ? "Hide" : "Show"}
                </IconButton>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                pr="4.5rem"
                placeholder="Password"
                type={show2 ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <InputRightElement top={"50%"} transform={"translateY(-50%)"}>
                <IconButton
                  isRound={true}
                  padding={"EdgeInsets.zero"}
                  icon={eyeIcon2}
                  size={"s"}
                  onClick={() => {
                    handleShow(show2, setShow2);
                  }}
                >
                  {show2 ? "Hide" : "Show"}
                </IconButton>
              </InputRightElement>
            </InputGroup>
          </div>
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}

          <Button
            size={"login"}
            type="submit"
            className="btn btn-primary float-right"
            onSubmit={handleSubmit}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default SignupForm;
