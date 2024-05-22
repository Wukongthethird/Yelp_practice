import { useState, useEffect, useContext } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import RoutesOrganizer from "./routes/RoutesOrganizer";
import yelpAPI from "./api";
import Login from "./routes/Login";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage"
import theme from "./theme/theme"
import { Navbar } from "./components/Navbar";








// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "yelp-token";


function App() {

  //move this to future routes so I do not need to fetch user for every page logged in
    const [user, setUser] = useState({ user: {}, status: "logout" });
    const [favoriteRestaurantsById, setFavoriteRestaurantsById] = useState(new Set([]));
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        //check session db to seee if i have logged in then save to state chang back
        const currentUser = await yelpAPI.fetchUser();
        setUser({...currentUser})
        // setFavoriteRestaurantsById(new Set(currentUser.user.favoriteRestaurants))
      }
      getCurrentUser();
    },
    [token]
  );

  // const user = await yelpAPI.loginUser(formData);
  async function login(loginData) {
    const res = await yelpAPI.loginUser(loginData);
    // checks for errors
    if (res.errors) {
      return res;
    }
    // sends user object
    setToken(res.token)
    setUser(res);
    return res;
  }

  async function logout() {
    await yelpAPI.logout();
    setUser({ user: {}, status: "logout" });
  }



  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <BrowserRouter>
        <UserContext.Provider value={{ ...user, logout , login}}>
          <RoutesOrganizer />
          <Navbar/>
        </UserContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
