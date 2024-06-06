import React from "react";
import { Box } from "@chakra-ui/react";
/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

const  Alert = ({ type = "danger", messages = [] }) => {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
      <Box className={`alert alert-${type}`} role="alert">
        {messages.map((error,ind) => (
            <p className="mb-0 small" key={error+ind}>
              {error}
            </p>
        ))}
      </Box>
  );
}

export default Alert;
