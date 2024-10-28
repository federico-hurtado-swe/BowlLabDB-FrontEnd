import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CustomerPrevOrdersStyles.module.css";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState(null);

  // Fetch customer ID from localStorage on component mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      const parsedCustomer = JSON.parse(storedCustomer);
      setCustomerId(parsedCustomer.id); // Assuming customer object contains "id"
    }
  }, []);

  // Fetch orders for the specific customer when the customerId is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (customerId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/order/findByCustomer/${customerId}`
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [customerId]);

  return (
    <section className={styles.ordersSection}>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Date Ordered:</strong>{" "}
                {new Date(order.dateOrdered).toLocaleDateString()}{" "}
                {new Date(order.dateOrdered).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.orderComplete ? "Complete" : "Incomplete"}
              </p>
              <p>
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Order Items:</strong>
              </p>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    <p>Name: {item.name}</p>
                    <p>Description: {item.description}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </section>
  );
};

export default CustomerOrders;
