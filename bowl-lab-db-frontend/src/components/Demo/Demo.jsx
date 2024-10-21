import React, { useState } from "react";
import axios from "axios";

const Demo = () => {
  const [customers, setCustomers] = useState([]);
  const [connected, setConnected] = useState(false);

  // Function to fetch customer data from the API using axios
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/customer/find/all"
      );
      setCustomers(response.data); // set the response data to the customers state
      setConnected(true);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <button onClick={fetchCustomers}>Fetch Customers</button>

      {connected ? <p>Connected to PostgreSQL</p> : null}
      {connected ? (
        <p>Endpoint: http://localhost:8080/api/customer/find/all</p>
      ) : null}

      {customers.length > 0 ? (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName} - {customer.email} -{" "}
              {customer.phone}
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers available</p>
      )}
    </div>
  );
};

export default Demo;
