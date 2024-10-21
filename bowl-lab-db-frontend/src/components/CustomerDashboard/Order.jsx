import React, { useState, useEffect } from "react";
import styles from "./OrderStyles.module.css";
import axios from "axios";

const Order = () => {
  const [menuItems, setMenuItems] = useState([]); // List of all menu items
  const [cart, setCart] = useState([]); // List of items in the current customer's cart
  const [errorMessage, setErrorMessage] = useState(""); // Error message if API fails
  const [successMessage, setSuccessMessage] = useState(""); // Success message after order placement

  // Fetch menu items when component mounts
  useEffect(() => {
    const getMenuItems = async () => {
      try {
        // GET request to fetch all menu items
        const response = await axios.get(
          "http://localhost:8080/api/menu/find/all"
        );

        // response should be a list of items here
        setMenuItems(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch menu items.");
        console.error(error);
      }
    };

    getMenuItems();
  }, []);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart([...cart, item]); // Add the selected item to the cart
  };

  // Function to place an order
  const placeOrder = async () => {
    try {
      const orderData = {
        items: cart, // Send the cart items in the request body
      };

      // // POST request to place the order
      // const response = await axios.post(
      //   "http://localhost:8080/api/order/create",
      //   orderData
      // );

      // if (response.status === 200) {
      //   setSuccessMessage("Order placed successfully!");
      //   setCart([]); // Clear the cart after successful order
      // } else {
      //   setErrorMessage("Failed to place order.");
      // }

      setSuccessMessage("Order placed successfully!");
      setCart([]); // clear cart
    } catch (error) {
      setErrorMessage("Failed to place order.");
      console.error(error);
    }
  };

  return (
    <section className={styles.orderSection}>
      <h2>Menu</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            {item.name} - {item.price}
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <section className={styles.cartSection}>
        <h3>Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}

        {cart.length > 0 && (
          <button onClick={placeOrder} className={styles.placeOrderButton}>
            Place Order
          </button>
        )}
      </section>
    </section>
  );
};

export default Order;
