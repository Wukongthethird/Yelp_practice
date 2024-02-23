import React , {useState, useEffect} from "react";
import yelpAPI from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

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

  console.log('eat',restaurants)
  if (!restaurants) return <LoadingSpinner />;
  
  console.log('done', restaurants)

  return (
    <div>
      restaurants
    </div>
  )
}

export default Home