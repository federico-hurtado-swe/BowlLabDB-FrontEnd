import React from "react";
import styles from "./EmployeeReservationsStyles.module.css";

const EmployeeReservations = () => {
  return (
    <section className={styles.reservationSection}>
      <h2>Employee Reservation</h2>
      <p>
        Welcome to the Employee Reservation page. Manage customer reservations
        here.
      </p>
    </section>
  );
};

export default EmployeeReservations;
