import React , {useEffect,useState} from "react";
import yelpAPI from "../api";
import LoadingSpinner from "./LoadingSpinner";
import SearchForm from "./SearchForm";

/**
 * on mount should load list of restaraunts
 * will reload on future search form
 * 
 * 
 */
const RestaurantList = () =>{
  console.debug("JobList")

  const [restaurants, setRestaurants] = useState(null);

  useEffect( function getAllRestaurantsOnMount(){
    console.debug("JobList useEffect getAllJobsOnMount");
    search();

  },[])

  async function search(restaurants_name) {
    console.log("search in here", restaurants_name )
    let restaurants = await yelpAPI.getAllRestaurants(restaurants_name)
    console.log("search past here", restaurants_name )
    setRestaurants(restaurants);
  }
  
  if(!restaurants) return <LoadingSpinner/>

  console.log('done', restaurants)

  return (
    <div className="JobList col-md-8 offset-md-2">
    <SearchForm searchFor={search} />
  </div>
  );

}

export default RestaurantList;
