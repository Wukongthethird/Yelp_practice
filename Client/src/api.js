import axios from "axios"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class yelpAPI{
  static BASE_URL = import.meta.env.VITE_BASEURL || "http://localhost:3001";

  static async request(endpoint="", data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //base api call
    const url = `${this.BASE_URL}/${endpoint}`;
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Gets a list of all restaurants */
  static async getAllRestaurants(restaurants_name) {

    let res = await this.request(`api/v1/restaurants`, {restaurants_name})
    console.log("yelp api",res)

    return res.restaurants  ;
  }

  /** Searches exact restaurant by id */
  static async getRestaurantByID(id) {
    let res = await this.request(`api/v1/restaurants/${id}`);
    return res.data;
  }

  /** filters out restaurants by name */
  // static async getRestaurantByName(name){
  //   name = name.toLowerCase()
  //   let res = await this.request('restaurants',{name})
  //   return res.data
  // }

  static async addNewRestaurant(data){
    let res = await this.request("api/v1/create_restaurant",data,"post")
    return res.data
    
  }
  



}

export default yelpAPI;