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
  Input,
} from "@chakra-ui/react";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   *
   */

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
      <Box mt={8} mx="auto" maxW="800px" w="100%" color="teal">
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
              <InputRightElement>
                <Button onClick={handleShow}> {show ? "Hide" : "Show"}</Button>
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

export default LoginForm;
