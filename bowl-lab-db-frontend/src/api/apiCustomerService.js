import axios from "axios";

const API_URL = "http://localhost:8080/api/customer";
// Client which will make the api calls

const apiCustomerClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Service methods for customer controller methods
const apiCustomerService = {
  // returns true for successful log in and false for failed
  login: async (email, password) => {
    try {
      // make API call
      const response = await apiCustomerClient.post("/login", {
        email,
        password,
      });

      // return true if good login
      if (response.status === 200) {
        return response.data;
      }

      // false if not
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // creates new customer
  register: async (firstName, lastName, email, phone, passkey) => {
    try {
      // call POST method
      const response = await apiCustomerClient.post("/create", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        passkey: passkey,
        previousOrders: [], // no previous orders
        rewardsPoints: 0, // no rewards points
      });

      // good response
      if (response.status === 201) {
        return {
          success: true,
          message: "Success",
        };
      }
    } catch (error) {
      // email already in use
      if (response.status === 409) {
        return {
          success: false,
          message: "Email is already in use.",
        };
      }

      return {
        success: false,
        message: error.response,
      };
    }
  },
};

export default apiCustomerService;
