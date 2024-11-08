import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageEmployeesStyles.module.css";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addr: "",
    passkey: "",
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/employee/find/all"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle input change for both new and editing forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingEmployee) {
      setEditingEmployee((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new employee
  const handleAddEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/employee/create",
        newEmployee
      );
      alert("Employee added successfully!");
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        addr: "",
        passkey: "",
      });
      // Refresh employee list
      const response = await axios.get(
        "http://localhost:8080/api/employee/find/all"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee.");
    }
  };

  // Update employee
  const handleUpdateEmployee = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/employee/update/${editingEmployee.id}`,
        editingEmployee
      );
      alert("Employee updated successfully!");
      setEditingEmployee(null);
      // Refresh employee list
      const response = await axios.get(
        "http://localhost:8080/api/employee/find/all"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employee/delete/${id}`);
      alert("Employee deleted successfully!");
      // Refresh employee list
      const response = await axios.get(
        "http://localhost:8080/api/employee/find/all"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  return (
    <section className={styles.managementSection}>
      <h2>Employee Management</h2>
      <p>Manage employees: Add, update, or delete employees.</p>

      {/* Add New Employee Form */}
      <div className={styles.addEmployee}>
        <h3>Add New Employee</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEmployee();
          }}
        >
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={newEmployee.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={newEmployee.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={newEmployee.phone}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="addr"
              value={newEmployee.addr}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Passkey:
            <input
              type="password"
              name="passkey"
              value={newEmployee.passkey}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Add Employee</button>
        </form>
      </div>

      {/* Employee List */}
      <div className={styles.employeeList}>
        <h3>All Employees</h3>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} className={styles.employeeCard}>
              {editingEmployee && editingEmployee.id === employee.id ? (
                <div>
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="firstName"
                      value={editingEmployee.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="lastName"
                      value={editingEmployee.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={editingEmployee.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Phone:
                    <input
                      type="text"
                      name="phone"
                      value={editingEmployee.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      name="addr"
                      value={editingEmployee.addr}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Passkey:
                    <input
                      type="password"
                      name="passkey"
                      value={editingEmployee.passkey}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <button onClick={handleUpdateEmployee}>Save</button>
                  <button onClick={() => setEditingEmployee(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>First Name:</strong> {employee.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {employee.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {employee.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {employee.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {employee.addr}
                  </p>
                  <button onClick={() => setEditingEmployee(employee)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEmployee(employee.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ManageEmployees;
