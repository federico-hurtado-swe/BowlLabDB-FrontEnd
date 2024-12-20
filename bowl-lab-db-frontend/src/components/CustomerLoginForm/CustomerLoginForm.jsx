import React, { useState } from "react";
import apiCustomerService from "../../api/apiCustomerService";
import styles from "./CustomerLoginFormStyles.module.css";
import { Link, useNavigate } from "react-router-dom";

/*
Form for customers to log in
*/
export const CustomerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // customer is null if login fails
    const customer = await apiCustomerService.login(email, password);

    if (customer != null) {
      // good login
      setSuccessMessage("Login Successful.");
      setErrorMessage("");

      // Store customer data in localStorage for use in customer dashboard
      localStorage.setItem("customer", JSON.stringify(customer));

      // navigate to /customer/order
      navigate("/customer/order");
    } else {
      // bad login
      setSuccessMessage("");
      setErrorMessage("Invalid Email or password");
    }
  };

  return (
    <section id="customer-login" className={styles.container}>
      <div>
        <div className={styles.title}>
          <h2> Login </h2>
        </div>

        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={styles.links}>
        <p>
          Don't have an account?{" "}
          <Link to="/customer/register">Sign up here</Link>
        </p>
        <p>
          Are you an employee? <Link to="/employee/login">Employee login</Link>
        </p>
      </div>
    </section>
  );
};

export default CustomerLoginForm;
