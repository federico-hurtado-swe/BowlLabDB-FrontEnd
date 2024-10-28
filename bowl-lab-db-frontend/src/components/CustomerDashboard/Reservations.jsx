import React, { useState, useEffect } from "react";
import styles from "./ReservationsStyles.module.css";
import axios from "axios";

const Reservations = () => {
  const [customer, setCustomer] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [message, setMessage] = useState("");

  // Retrieve customer data from localStorage on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");

    if (storedCustomer) {
      const parsedCustomer = JSON.parse(storedCustomer);
      setCustomer(parsedCustomer);
    }
  }, []);

  // Function to load customer's existing reservations
  const loadCustomerReservations = async () => {
    if (!customer) return; // Ensure customer data is available
    try {
      const response = await axios.get(
        `http://localhost:8080/api/reservations/customer/${customer.id}`
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching customer reservations:", error);
    }
  };

  // Function to load available slots for the selected day
  const loadAvailableSlots = async () => {
    if (!selectedDay) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/reservations/available`,
        {
          params: { day: selectedDay },
        }
      );
      setAvailableSlots(response.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  // Function to create a new reservation for a selected slot
  const handleReserveSlot = async (reservationTime) => {
    if (!customer) return; // Ensure customer data is available

    try {
      const response = await axios.post(
        `http://localhost:8080/api/reservations/create`,
        null,
        {
          params: {
            reservationTime: reservationTime,
            customerId: customer.id,
          },
        }
      );
      setMessage(response.data); // Display success or error message from backend
      loadCustomerReservations(); // Refresh reservation list
      loadAvailableSlots(); // Refresh available slots
    } catch (error) {
      console.error("Error creating reservation:", error);
      setMessage("Failed to reserve slot. Please try again.");
    }
  };

  useEffect(() => {
    if (customer) loadCustomerReservations();
  }, [customer]);

  useEffect(() => {
    loadAvailableSlots();
  }, [selectedDay]);

  return (
    <section className={styles.reservationSection}>
      <h2>Reservations</h2>

      <h3>Choose a Day to View Available Slots</h3>
      <input
        type="date"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        required
      />

      <h3>Available Slots</h3>
      {availableSlots.length > 0 ? (
        <ul className={styles.slotList}>
          {availableSlots.map((slot) => (
            <li key={slot} className={styles.slotItem}>
              <span>
                {new Date(slot).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <button
                onClick={() => handleReserveSlot(slot)}
                className={styles.reserveButton}
              >
                Reserve
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available slots for the selected day.</p>
      )}

      {message && <p className={styles.message}>{message}</p>}

      <h3>Your Reservations</h3>
      {reservations.length > 0 ? (
        <ul className={styles.reservationList}>
          {reservations.map((reservation) => (
            <li key={reservation.id} className={styles.reservationItem}>
              <div>
                <p>Reservation ID: {reservation.id}</p>
                <p>
                  Date and Time:{" "}
                  {new Date(reservation.reservationTime).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no reservations.</p>
      )}
    </section>
  );
};

export default Reservations;
