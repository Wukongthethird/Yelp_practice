import React, { useState } from "react";
import yelpAPI from "../api";
// import { useHistory } from "react-router-dom";
import addNewRestaurant from "../routes/AddNewRestaurant";
import Alert from "./Alert";

const AddRestaurantsForm = () => {
  // const history = useHistory();
  const [formData, setFormData] = useState({
    restaurants_name: "",
    address_location: "",
    city: "",
    zipcode: "",
    price_range: 0,
  });

  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "restaurantsform",
    "formData=",
    formData,
    "formErrors=",
    formErrors,
    "saveConfirmed=",
    saveConfirmed
  );

  /**
   *
   * on form submit
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    let restaurantData = {
      restaurants_name: formData.restaurants_name,
      address_location: formData.address_location,
      city: formData.City,
      zipcode: formData.zipcode,
      price_range: +formData.price_range,
    };
  
  let newRestaurant;
  console.log("im here")
  try {
    newRestaurant = yelpAPI.addNewRestaurant(formData);
  } catch (err) {
    debugger;
    setFormErrors(err);
    debugger;
  }
  setFormErrors([]);
  setSaveConfirmed(true);

}
  /** Handles form changes  */
  function handleChange(evt){
    const {name, value} = evt.target;
    
    if (name == "price_range" && !isNaN(value)){
      setFormData( f => ({...f,[name]:+value}));
    }
    setFormData( f => ({...f,[name]:value}));
  }

  console.log(typeof(formData.price_range))
  

  return (
    <div className="AddRestaurantForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">add Restaurant</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Restaraunt Name</label>
                <input
                    type="restaurants_name"
                    name="restaurants_name"
                    className="form-control"
                    value={formData.restaurants_name}
                    onChange={handleChange}
                    autoComplete="restaraunts_name"
                    required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                    type="address_location"
                    name="address_location"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="address_location"
                    required
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                    type="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    autoComplete="city"
                    required
                />
              </div>
              <div className="form-group">
                <label>Zipcode</label>
                <input
                    type="zipcode"
                    name="zipcode"
                    className="form-control"
                    value={formData.zipcode}
                    onChange={handleChange}
                    autoComplete="zipcode"
                    required
                />
              </div>
              <div className="form-group">
                <label>Price Range</label>
                <input
                    type="price_range"
                    name="price_range"
                    className="form-control"
                    value={formData.price_range}
                    onChange={handleChange}
                    autoComplete="price_range"
                    required
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <button
                  className="btn btn-primary float-right"
                  onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
);

};

export default AddRestaurantsForm;