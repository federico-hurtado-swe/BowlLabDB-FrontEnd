import React from "react";
import styles from "./EmployeeOrdersStyles.module.css";

const EmployeeOrders = () => {
  return (
    <section className={styles.ordersSection}>
      <h2>Employee Orders</h2>
      <p>Welcome to the Employee Orders page. Manage customer orders here.</p>
    </section>
  );
};

export default EmployeeOrders;
