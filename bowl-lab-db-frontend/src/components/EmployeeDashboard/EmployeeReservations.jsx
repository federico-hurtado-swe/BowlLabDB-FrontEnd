import React, { useState, useEffect } from "react";
import styles from "./EmployeeReservationsStyles.module.css";
import axios from "axios";

const EmployeeReservations = () => {
  const [dailyReservations, setDailyReservations] = useState([]);

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Fetch reservations for today’s date
  const loadDailyReservations = async () => {
    const todayDate = getTodayDate();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reservations/date/${todayDate}`
      );
      console.log("Daily reservations:", response.data);
      setDailyReservations(response.data);
    } catch (error) {
      console.error("Error fetching daily reservations:", error);
    }
  };

  // Load reservations on component mount
  useEffect(() => {
    loadDailyReservations();
  }, []);

  return (
    <section className={styles.reservationSection}>
      <h2>Today's Reservations</h2>
      {dailyReservations.length > 0 ? (
        <ul className={styles.reservationList}>
          {dailyReservations.map((reservation) => (
            <li key={reservation.id} className={styles.reservationItem}>
              <div>
                <p>Reservation ID: {reservation.id}</p>
                <p>Customer ID: {reservation.customerId}</p>
                <p>
                  Time:{" "}
                  {new Date(reservation.reservationTime).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations for today.</p>
      )}
    </section>
  );
};

export default EmployeeReservations;
