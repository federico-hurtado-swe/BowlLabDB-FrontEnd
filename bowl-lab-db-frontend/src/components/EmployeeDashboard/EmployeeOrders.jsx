import React, { useState, useEffect } from "react";
import styles from "./EmployeeOrdersStyles.module.css";
import axios from "axios";

const EmployeeOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    setCurrentDate(getTodayDate());
  }, []);

  const loadCurrentOrders = async () => {
    try {
      const orders = await axios.get(
        "http://localhost:8080/api/order/find/unfinished"
      );
      console.log("response: ", orders.data);
      setCurrentOrders(orders.data);
    } catch (error) {
      console.error("Error fetching current orders: ", error);
    }
  };

  const loadDailyOrders = async () => {
    const todayDate = getTodayDate();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/findByDate/${todayDate}`
      );
      console.log("Daily orders:", response.data);
      setDailyOrders(response.data);
    } catch (error) {
      console.error("Error fetching daily orders:", error);
    }
  };

  const markOrderAsComplete = async (orderId) => {
    try {
      await axios.put(`http://localhost:8080/api/order/update/${orderId}`);
      console.log("Order marked as complete:", orderId);
      await loadCurrentOrders();
      await loadDailyOrders();
    } catch (error) {
      console.error("Error marking order as complete:", error);
    }
  };

  useEffect(() => {
    loadCurrentOrders();
    loadDailyOrders();
  }, []);

  return (
    <section className={styles.ordersSection}>
      <h2>Restaurant Orders</h2>
      <p>
        <strong>Today's Date:</strong> {currentDate}
      </p>

      <h3>Current Orders</h3>
      {currentOrders.length > 0 ? (
        <ul className={styles.orderList}>
          {currentOrders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <div>
                <p>Order #{order.id}</p>
                <p>Ordered By: {order.customerName}</p>
                <p>
                  Status: {order.order_complete ? "Complete" : "Incomplete"}
                </p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>
                  Ordered At: {new Date(order.dateOrdered).toLocaleDateString()}{" "}
                  {new Date(order.dateOrdered).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Order Items:</p>
                <ul>
                  {order.orderItems.length > 0 ? (
                    order.orderItems.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))
                  ) : (
                    <li>No items</li>
                  )}
                </ul>
                {!order.orderComplete && (
                  <button
                    onClick={() => markOrderAsComplete(order.id)}
                    className={styles.completeButton}
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No current orders available.</p>
      )}

      <h3>Daily Orders (Today)</h3>
      {dailyOrders.length > 0 ? (
        <ul className={styles.orderList}>
          {dailyOrders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <div>
                <p>Order #{order.id}</p>
                <p>Ordered By: {order.customerName}</p>
                <p>Status: {order.orderComplete ? "Complete" : "Incomplete"}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>
                  Ordered At: {new Date(order.dateOrdered).toLocaleDateString()}{" "}
                  {new Date(order.dateOrdered).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Order Items:</p>
                <ul>
                  {order.orderItems.length > 0 ? (
                    order.orderItems.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))
                  ) : (
                    <li>No items</li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders for today available.</p>
      )}
    </section>
  );
};

export default EmployeeOrders;
