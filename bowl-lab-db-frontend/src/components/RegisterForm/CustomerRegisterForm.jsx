import React, { useState } from "react";
import apiCustomerService from "../../api/apiCustomerService";

/*
Form for customers to register.
*/
export const CustomerRegisterForm = () => {
  // fields for customer to fill in
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passkey, setPasskey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // call register method
    const apiResponse = await apiCustomerService.register(
      firstName,
      lastName,
      email,
      phone,
      passkey
    );

    // successful registation
    if (apiResponse.success) {
      setErrorMessage("");
      setSuccessMessage("Successfully registered.");
    } else {
      setEmail(apiResponse.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2> Register </h2>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerRegisterForm;
