import CustomerLoginForm from "./components/CustomerLoginForm/CustomerLoginForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CustomerRegisterForm from "./components/CustomerRegisterForm/CustomerRegisterForm";
import { EmployeeLoginForm } from "./components/EmployeeLoginForm/EmployeeLoginForm";
import Order from "./components/CustomerDashboard/Order";
import Reservations from "./components/CustomerDashboard/Reservations";
import CustomerProfile from "./components/CustomerDashboard/CustomerProfile";
import CustomerLayout from "./CustomerLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" replace />} />
        <Route path="/customer/login" element={<CustomerLoginForm />} />
        <Route path="/customer/register" element={<CustomerRegisterForm />} />

        <Route path="/employee/login" element={<EmployeeLoginForm />} />

        <Route element={<CustomerLayout />}>
          <Route path="/customer/order" element={<Order />} />
          <Route path="/customer/reservations" element={<Reservations />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
