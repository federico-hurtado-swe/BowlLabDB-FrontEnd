import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./EmployeeLoginFormStyles.module.css";

/*
Form for employees to log in
*/
export const EmployeeLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // function to make api call to employee login
  const login = async (email, password) => {
    try {
      const response = await axios.post("/employee/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Successful log in.");
        return true;
      }

      console.log(response.data);

      return false;
    } catch (error) {
      console.error("Error: ", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // boolean result of successful login or not
    const successful = await login(email, password);

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
    <section id="employee-login" className={styles.container}>
      <div>
        <div className={styles.title}>
          <h2>Employee Login</h2>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
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
                type="password"
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
          <Link to="/customer/login">Customer login</Link>
        </p>
      </div>
    </section>
  );
};

export default EmployeeLoginForm;
