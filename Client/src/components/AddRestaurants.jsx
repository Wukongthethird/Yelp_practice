import React, {useState} from "react";


const AddRestaurants =()=>{

  const [formData, setFormData] = useState({
    restaurants_name:"",
    address_location: "",
    city: "",
    zipcode: "",
    price_range: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "restaurantsform",
    "formData=", formData,
    "formErrors=", formErrors,
    "saveConfirmed=", saveConfirmed,
);
  return (
    <div className="add-restaurant">
      

    </div>
  )
};