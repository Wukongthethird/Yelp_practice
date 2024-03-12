import * as ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Restaurantsdetailpage from "./RestaurantsDetailPage";
import Update from "./Update";
import AddNewRestaurant from "./AddNewRestaurant";
import SignUp from "./SignUp";
import Login from "./Login";

const RoutesOrganizer = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/restaurants/:id/"
          element={<Restaurantsdetailpage />}
        />
        <Route exact path="/restaurants/:id/update" element={<Update />} />
        <Route exact path="/create_restaurant" element={<AddNewRestaurant />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default RoutesOrganizer;
