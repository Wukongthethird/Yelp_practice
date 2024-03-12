import React, { useState } from "react";
import yelpAPI from "../../api";
// import { useHistory } from "react-router-dom";
import Alert from "../../components/Alert";

const AddRestaurantsForm = () => {
  // const history = useHistory();
  const [formData, setFormData] = useState({
    restaurantsName: "",
    addressLocation: "",
    city: "",
    zipcode: "",
    priceRange: "",
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

    // let restaurantData = {
    //   restaurants_name: formData.restaurants_name,
    //   address_location: formData.address_location,
    //   city: formData.City,
    //   zipcode: formData.zipcode,
    //   price_range: formData.price_range,
    // };

    try {
      yelpAPI.addNewRestaurant(formData);
    } catch (err) {

      setFormErrors(err);
  
    }
    setFormErrors([]);
    setSaveConfirmed(true);
  }
  /** Handles form changes  */
  function handleChange(evt) {
    const { name, value } = evt.target;
    console.log("value", value);
    if (name == "priceRange" && !isNaN(value)) {
      setFormData((f) => ({ ...f, [name]: +value }));
    }
    setFormData((f) => ({ ...f, [name]: value }));
  }

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
                  type="restaurantsName"
                  name="restaurantsName"
                  className="form-control"
                  value={formData.restaurantsName}
                  onChange={handleChange}
                  autoComplete="restarauntsName"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="addressLocation"
                  name="addressLocation"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="addressLocation"
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
                <select
                  className="form-group"
                  type="priceRange"
                  name="priceRange"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Price
                  </option>
                  <option
                    value={1}
                    type="priceRange"
                    name="priceRange"
                    onChange={handleChange}
                  >
                    $
                  </option>
                  <option
                    value={2}
                    type="priceRange"
                    name="priceRange"
                    onChange={handleChange}
                  >
                    $$
                  </option>
                  <option
                    default
                    value={3}
                    type="priceRange"
                    name="priceRange"
                    onChange={handleChange}
                  >
                    $$$
                  </option>
                  <option
                    value={4}
                    type="priceRange"
                    name="priceRange"
                    onChange={handleChange}
                  >
                    $$$$
                  </option>
                  <option
                    value={5}
                    type="priceRange"
                    name="priceRange"
                    onChange={handleChange}
                  >
                    $$$$$
                  </option>
                </select>
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              {saveConfirmed ? (
                <Alert type="success" messages={["Updated successfully."]} />
              ) : null}

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
