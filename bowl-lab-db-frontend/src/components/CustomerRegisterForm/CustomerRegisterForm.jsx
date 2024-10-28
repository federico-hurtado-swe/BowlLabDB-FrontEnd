import React, { useState } from "react";
import apiCustomerService from "../../api/apiCustomerService";
import styles from "./CustomerRegisterFormStyles.module.css";
import { Navigate, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

      navigate("/customer/login");
    } else {
      setEmail(apiResponse.message);
      setSuccessMessage("");
    }
  };

  return (
    <section id="customer-register" className={styles.container}>
      <div>
        <div className={styles.title}>
          <h2> Register </h2>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Password:</label>
              <input
                type="text"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
};

export default CustomerRegisterForm;
