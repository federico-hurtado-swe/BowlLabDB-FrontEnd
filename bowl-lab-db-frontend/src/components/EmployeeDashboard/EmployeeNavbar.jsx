import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmployeeNavbarStyles.module.css";

const EmployeeNavbar = () => {
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
      </ul>
    </nav>
  );
};

export default EmployeeNavbar;
