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
} from "@chakra-ui/react";

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

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await yelpAPI.signUpUser(formData);

    if(res.errors) { 
      let msgs =[]
      for(let msg of res.errors){
        msgs.push(msg.msg)
      }
      setFormErrors(msgs)
    }
  
    else{
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

  return (
    <div className="SignUpForm">
      <Box mt={8} mx="auto" maxW="800px" w="100%" color="teal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              placeholder="First Name"
              type="firstName"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
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
                pr="4.5rem"
                placeholder="Password"
                type={show1 ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement>
                <Button
                  onClick={() => {
                    handleShow(show1, setShow1);
                  }}
                >
                  {show1 ? "Hide" : "Show"}
                </Button>
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
              <InputRightElement>
                <Button
                  onClick={() => {
                    handleShow(show2, setShow2);
                  }}
                >
                  {" "}
                  {show2 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          {formErrors ? <Alert type="danger" messages={formErrors} /> : null}

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

export default SignupForm;
