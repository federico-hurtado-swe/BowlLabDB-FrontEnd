import React, { useEffect, useState } from "react";
import styles from "./EmployeeProfileStyles.module.css";
import axios from "axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addr: "",
    passkey: "",
  });

  // Fetch employee data from localStorage when the page mounts
  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee");

    console.log("Found employee: ", storedEmployee);

    if (storedEmployee) {
      const parsedEmployee = JSON.parse(storedEmployee);
      setEmployee(parsedEmployee);
      setUpdatedEmployee(parsedEmployee); // Set initial values for edit form
    }
  }, []);

  // Handle input change for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit for profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/employee/update/${employee.id}`,
        updatedEmployee
      );
      if (response.status === 204) {
        setEmployee(updatedEmployee); // Update displayed employee info
        localStorage.setItem("employee", JSON.stringify(updatedEmployee)); // Update localStorage
        setIsEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update employee:", error);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <section className={styles.profileSection}>
      <h2>Your Profile</h2>

      {employee ? (
        isEditing ? (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <div className={styles.inputGroup}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={updatedEmployee.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={updatedEmployee.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedEmployee.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={updatedEmployee.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Address:</label>
              <input
                type="text"
                name="addr"
                value={updatedEmployee.addr}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password:</label>
              <input
                type="password"
                name="passkey"
                value={updatedEmployee.passkey}
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
          <div className={styles.employeeInfo}>
            <p>
              <strong>Name:</strong> {employee.firstName} {employee.lastName}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p>
              <strong>Address:</strong> {employee.addr}
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
        <p>No employee information available. Please log in.</p>
      )}
    </section>
  );
};

export default EmployeeProfile;
