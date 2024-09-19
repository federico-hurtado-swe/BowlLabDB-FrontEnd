import React, { useState } from "react";
import apiCustomerService from "../../api/apiCustomerService";
import styles from "./CustomerLoginFormStyles.module.css";

/*
Form for customers to log in
*/
export const CustomerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // boolean result of successful login or not
    const successful = await apiCustomerService.login(email, password);

    if (successful) {
      // good login
      setSuccessMessage("Login Successful.");
      setErrorMessage("");
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
    </section>
  );
};

export default CustomerLoginForm;
