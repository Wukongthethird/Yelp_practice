import axios from "axios";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class yelpAPI {

  static BASE_URL = import.meta.env.VITE_BASEURL || "http://localhost:3001";

  //https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase
  static snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
  

  static async request(endpoint = "", data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //base api call
    const url = `${this.BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    } 
  }

  /** Gets a list of all restaurants */
  static async getAllRestaurants(restaurantsName) {
    let res = await this.request(`api/v1/restaurants`, { restaurantsName });
    return res.restaurants;
  }

  /** Searches exact restaurant by id */
  static async getRestaurantByID(id) {
    let res = await this.request(`api/v1/restaurants/${id}`);
    return res.data;
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

  static async signUpUser(data){
    let res = await this.request("api/v1/signup", data , "post")
    return res.status
  }

  static async loginUser(data){

 
    let res = await this.request("api/v1/login", data , "post")
    console.log(res,"api")
    return res
  }

  static async logout(){
    let res = await this.request("api/v1/logout" , "delete")
    console.log(res,"api")
    return res
  }
}

export default yelpAPI;
