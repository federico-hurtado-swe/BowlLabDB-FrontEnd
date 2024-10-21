import React from "react";
import { Link } from "react-router-dom";
import styles from "./CustomerNavbarStyles.module.css";

const CustomerNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/customer/order"> Order </Link>
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
      </ul>
    </nav>
  );
};

export default CustomerNavbar;
