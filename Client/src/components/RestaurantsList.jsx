import React , {useEffect,useState} from "react";

/**
 * on mount should load list of restaraunts
 * will reload on future search form
 * 
 * 
 */
const RestaurantList = () =>{
  console.ldebug("JobList")

  const [restaurants, setRestaurants] = useState(null);

  useEffect( function getAllRestaurantsOnMount(){
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
  })

  async function search(restaurants_name) {
    let restaurants = await yelpapi
    setRestaurants(restaurants);
  }



}

export default RestaurantList;
