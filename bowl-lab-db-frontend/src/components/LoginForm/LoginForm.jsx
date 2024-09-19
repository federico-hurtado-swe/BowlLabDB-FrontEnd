import React, { useState } from "react";
import apiCustomerService from "../../api/apiCustomerService";

/*
Form for customers to log in
*/
export const LoginForm = () => {
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
    <div>
      <h2> Login </h2>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
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
          <label>Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
