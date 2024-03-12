import React, { useState } from "react";
import Alert from "../Alert";
import yelpAPI from "../../api";
import { useNavigate } from 'react-router-dom';
import { Box , Flex ,Button} from "@chakra-ui/react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate()

  console.debug(
    "LoginForm",
    "Login=",
    typeof login,
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
    try {
      await yelpAPI.loginUser(formData);
      navigate("/")
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
  //   <div className="LoginForm">
  //     <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
  //       <h2 className="mb-3">Login</h2>
  //       <div className="card">
  //         <div className="card-body">
  //           <form onSubmit={handleSubmit}>
  //             <div className="form-group">
  //               <label>Email</label>
  //               <input
  //                 type="email"
  //                 name="email"
  //                 className="form-control"
  //                 value={formData.email}
  //                 onChange={handleChange}
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label>Password</label>
  //               <input
  //                 type="password"
  //                 name="password"
  //                 className="form-control"
  //                 value={formData.password}
  //                 onChange={handleChange}
  //               />
  //             </div>
  //             {formErrors.length ? (
  //               <Alert type="danger" messages={formErrors} />
  //             ) : null}

  //             <button
  //               type="submit"
  //               className="btn btn-primary float-right"
  //               onSubmit={handleSubmit}
  //             >
  //               Submit
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  <div className="LoginForm">
  <Box
    mt={8}
    mx="auto"
    maxW="800px"
    w="100%"
  >
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
      
            <input
            placeholder="Email"
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">

            <input
            placeholder="Password"
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {formErrors.length ? (
            <Alert type="danger" messages={formErrors} />
          ) : null}

          <Button mt ={4} color={'red'}
            type="submit"
            className="btn btn-primary float-right"
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  </Box> 
</div>
);
}

export default LoginForm;
