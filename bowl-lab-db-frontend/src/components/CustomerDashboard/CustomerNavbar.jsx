import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CustomerNavbarStyles.module.css";

const CustomerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear customer data from localStorage
    localStorage.removeItem("customer");

    // Redirect to login page
    navigate("/customer/login");
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/customer/order"> Place Order </Link>
        </li>
        <li>
          <Link to="/customer/viewOrders"> My Orders </Link>
        </li>
        <li>
          <Link to="/customer/reservations"> Reservations </Link>
        </li>
        <li>
          <Link to="/customer/reviews"> Reviews </Link>
        </li>
        <li>
          <Link to="/customer/profile"> My Profile </Link>
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

export default CustomerNavbar;
