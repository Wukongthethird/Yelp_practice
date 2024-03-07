import React , {useState, useEffect} from "react";
import yelpAPI from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import RestaurantList from "../components/restaurants/RestaurantsList";
import SearchForm from "../components/forms/SearchForm";

const Home = () =>{

  const [restaurants, setRestaurants] = useState(null);

  useEffect(function getAllRestaurantsOnMount() {
    console.debug("restaurants useEffect getallrestauranrs");
    getAllrestaurants();
  }, []);

  async function getAllrestaurants(){
    let restaurants = await yelpAPI.getAllRestaurants();
    setRestaurants(restaurants);
  }

  
  if (!restaurants) return <LoadingSpinner />;
  
  console.log('done', restaurants)

  return (
    <div>
    <button onClick={yelpAPI.logout}>
      LogOut
    </button>
      <RestaurantList/>
    </div>
  )
}

export default Home