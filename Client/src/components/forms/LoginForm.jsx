import React, { useState } from "react";
import Alert from "../Alert";
import yelpAPI from "../../api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  InputRightElement,
  InputGroup,
  Input,IconButton
} from "@chakra-ui/react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const eyeIcon = show? (
    <FontAwesomeIcon icon={faEye} />
  ) : (
    <FontAwesomeIcon icon={faEyeSolid} />
  );
  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   *
   */

  // checks from app level
  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await login(formData);
    if (res.errors) {
      setFormErrors([res.errors.message]);
    } 
    else {
      navigate("/");
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleShow() {
    setShow(!show);
  }

  return (
    <div className="LoginForm">
      <Box  mt={8} mx="auto" maxW="300px" w="100% " variant="floating">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
                type={show ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement top={"50%"} transform={"translateY(-50%)"}>
                <IconButton
                  margin={"auto"}
                  isRound={true}
                  icon={eyeIcon}
                  padding={"EdgeInsets.zero"}
                  size={"s"}
                  onClick={() => {
                    handleShow();
                  }}
                >
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
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default LoginForm;
