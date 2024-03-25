import { useState } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import "./App.css";

import RoutesOrganizer from "./routes/RoutesOrganizer";
import yelpAPI from "./api";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import UserContext from "./auth/UserContext";

const colors = {
  brand: {
    200: "#90CDF4",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function App() {
  const [user, setUser] = useState({ user: {}, status: "logout" });

  // const user = await yelpAPI.loginUser(formData);
  async function login(loginData) {
    const res = await yelpAPI.loginUser(loginData);
    
    if (res.errors) {
      return res;
    } 
      setUser(res);
      return res
  }

  async function logout() {
    await yelpAPI.logout();
    setUser({ user: {}, status: "logout" });
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value={{ user, logout }}>
          <RoutesOrganizer />
          <Routes>
            <Route exact path="/login" element={<Login login={login} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
