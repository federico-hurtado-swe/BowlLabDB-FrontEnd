import React from "react";
import styles from "./CustomerPrevOrdersStyles.module.css";

const CustomerPrevOrders = () => {
  return (
    <section className={styles.prevOrdersSection}>
      <h2>Previous Orders</h2>
      <p>Here you will see all your previous orders.</p>
    </section>
  );
};

export default CustomerPrevOrders;
