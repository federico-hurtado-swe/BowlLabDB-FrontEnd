import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployeeMenuStyles.module.css";

function EmployeeMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editItem, setEditItem] = useState(null);

  // Fetch menu items
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/menu/find/all"
      );

      console.log("items: ", response.data);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // Add new item
  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:8080/api/menu/addItem", newItem);
      fetchMenuItems(); // Refresh the list
      setNewItem({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Edit existing item
  const handleEditItem = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/menu/updateItem/${editItem.id}`,
        editItem
      );
      fetchMenuItems(); // Refresh the list
      setEditItem(null);
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/menu/delete/${id}`);
      fetchMenuItems(); // Refresh the list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section className={styles.orderSection}>
      <h2>View and update Menu</h2>

      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.menuItem}>
            <p>
              <strong>{item.name}</strong>: {item.description} - $
              {item.price.toFixed(2)}
            </p>
            <div className={styles.buttonContainer}>
              <button onClick={() => setEditItem(item)}>Edit</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form for adding new item */}
      <section className={styles.cartSection}>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: parseFloat(e.target.value) })
          }
        />
        <button onClick={handleAddItem} className={styles.placeOrderButton}>
          Add Item
        </button>
      </section>

      {/* Form for editing an item */}
      {editItem && (
        <section className={styles.cartSection}>
          <h3>Edit Item</h3>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value })
            }
          />
          <input
            type="number"
            value={editItem.price}
            onChange={(e) =>
              setEditItem({ ...editItem, price: parseFloat(e.target.value) })
            }
          />
          <button onClick={handleEditItem} className={styles.placeOrderButton}>
            Save
          </button>
          <button
            onClick={() => setEditItem(null)}
            className={styles.placeOrderButton}
          >
            Cancel
          </button>
        </section>
      )}
    </section>
  );
}

export default EmployeeMenu;
