import React , {useEffect,useState} from "react";
import yelpAPI from "../api";
import LoadingSpinner from "./LoadingSpinner";
import SearchForm from "./SearchForm";
import RestaurantCardList from "./RestaurantCardList";

/**
 * on mount should load list of restaraunts
 * will reload on future search form
 * 
 * 
 */
const RestaurantList = () =>{
  console.debug("RestaurantList")

  const [restaurants, setRestaurants] = useState(null);

  useEffect( function getAllRestaurantsOnMount(){
    console.debug("JobList useEffect getAllJobsOnMount");
    search();

  },[])

  async function search(restaurants_name) {
    let restaurants = await yelpAPI.getAllRestaurants(restaurants_name)
    setRestaurants(restaurants);
  }
  console.log("loadedd",restaurants)
  if(!restaurants) return <LoadingSpinner/>
  



  return (
    <div className="JobList col-md-8 offset-md-2">
    <SearchForm searchFor={search} />
    {restaurants.length
    ?<RestaurantCardList restaurants={restaurants}/>
    :<p className="lead">Sorry, no results were found!</p>
  }

  </div>
  );

}

export default RestaurantList;
