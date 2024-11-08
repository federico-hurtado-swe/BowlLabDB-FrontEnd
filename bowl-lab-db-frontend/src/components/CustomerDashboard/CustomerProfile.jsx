import React, { useEffect, useState } from "react";
import styles from "./CustomerProfileStyles.module.css";
import axios from "axios";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passkey: "",
  });

  // Get customer data when the page mounts
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");

    if (storedCustomer) {
      const parsedCustomer = JSON.parse(storedCustomer);
      setCustomer(parsedCustomer);
      setUpdatedCustomer(parsedCustomer); // Set initial values for edit form
    }
  }, []);

  // Handle input change for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/customer/update/${customer.id}`,
        updatedCustomer
      );
      if (response.status === 200) {
        setCustomer({ ...updatedCustomer, passkey: "" }); // Clear passkey after update
        localStorage.setItem(
          "customer",
          JSON.stringify({ ...updatedCustomer, passkey: "" })
        ); // Update localStorage without passkey
        setIsEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update customer.");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <section className={styles.profileSection}>
      <h2>Your Profile</h2>

      {customer ? (
        isEditing ? (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <div className={styles.inputGroup}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={updatedCustomer.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={updatedCustomer.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedCustomer.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={updatedCustomer.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>New Passkey:</label>
              <input
                type="password"
                name="passkey"
                value={updatedCustomer.passkey}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.saveButton}>
              Save Changes
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className={styles.customerInfo}>
            <p>
              <strong>Name:</strong> {customer.firstName} {customer.lastName}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )
      ) : (
        <p>No customer information available. Please log in.</p>
      )}
    </section>
  );
};

export default CustomerProfile;
