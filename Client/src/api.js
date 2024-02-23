import axios from 'axios'

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

  static async getAllRestaurants() {
    let res = await axios.get(`${this.BASE_URL}/api/v1/restaurants`)
    return res.data;
  }


  static async getRestaurant(id) {
    let res = await this.request(`api/v1/restaurants/${id}`);
    return res.data;
  }

  



}

export default yelpAPI