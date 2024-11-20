import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./EmployeeNavbarStyles.module.css";

const EmployeeNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear customer data from localStorage
    localStorage.removeItem("employee");

    // Redirect to login page
    navigate("/employee/login");
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/employee/orders">Orders</Link>
        </li>
        <li>
          <Link to="/employee/reservations">Reservations</Link>
        </li>
        <li>
          <Link to="/employee/menu">Menu</Link>
        </li>
        <li>
          <Link to="/employee/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/employee/profile">Profile</Link>
        </li>
        <li>
          <Link to="/employee/manage-employees">Manage employees</Link>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default EmployeeNavbar;
