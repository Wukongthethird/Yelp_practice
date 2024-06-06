import axios from "axios";
import {useNavigate} from 'react-router-dom'


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class yelpAPI {
  static BASE_URL = import.meta.env.VITE_BASEURL || "http://localhost:3001";

  static token;

  //https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase
  static snakeToCamel = (str) =>
    str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
      );

  static async request(endpoint = "", data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //base api call
    const headers = { "Access-Control-Allow-Origin": "http://localhost:3000" };
    const withCredentials = { withCredentials: true };
    const credentials = { credentials: "include" };
    const url = `${this.BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};
    /**  this makes cookie save in browser */
    try {
      return (
        await axios({
          url,
          method,
          data,
          params,
          headers,
          withCredentials: true,
          credentials: "include",
        })
      ).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
      navigate("/") 
    }
  }

  /** Gets a list of all restaurants */
  static async getAllRestaurants(restaurantsName) {
    let res = await this.request(`api/v1/restaurants`, { restaurantsName });
    return res.restaurants;
  }

  /** Searches exact restaurant by id */
  static async getRestaurantByID(id) {
  
    let res = await this.request(`api/v1/restaurant/${id}`);
   
    return res;
  }

  static async getNewRestaurants(data) {
    let res = await this.request("api/v1/newrestaurant", data, "post");
    return res;
  }

  /** adds new restaurant based on form data */
  static async addNewRestaurant(data) {
    let res = await this.request("api/v1/create_restaurant", data, "post");
    return res.data;
  }

  /** delete restaurant based on ID should be allowed only by admin */
  static async deleteRestaurant(id) {
    let res = await this.request(`api/v1/restaurants/${id}`, "delete");
    return res.status;
  }

  static async fetchUser() {
    let res = await this.request(`api/v1/fetchuser/`);
    return res;
  }

  static async signUpUser(data) {
    let res = await this.request("api/v1/signup", data, "post");
    return res;
  }

  static async loginUser(data) {
    let res = await this.request("api/v1/login", data, "post");
    return res;
  }

  static async logout() {
    const res = await this.request("api/v1/logout", {}, "delete");
    return res;
  }

  static async favoriting(data) {
    let res = await this.request("api/v1/favorite", data, "post");

    return res;
  }

  // so turns out this is a survey on yelp no one votes on this repurpose to rating
  static async priceVoting(data){
    let res = await this.request("api/v1/favorite", data, "post");

    return res;
  }

  static async rating(data){
    let res = await this.request("api/v1/restaurantrating", data, "post");

    return res;
  }


  static async commentingOrReplying(data){
    let res = await this.request("api/v1/commentorreply", data, "post");
 
    return res;
  }


  static async seeReplies(data){
    let res = await this.request("api/v1/seereplies", data, "post");
    return res.result;
  }

  static async editComment(data){
    let res = await this.request("api/v1/editcomment", data, "post");
    return res;
  }
  
  static async getId(){
    let res = await this.request("api/v1/getuserid");

    return res
  }

  //DEPRECATED
  // static async getfavorites(id){
  //   let res = await this.request(`api/v1/getfavorites/${id}`, );
  //   return res;
  // }
}

export default yelpAPI;
