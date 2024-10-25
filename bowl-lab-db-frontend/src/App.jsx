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
import CustomerPrevOrders from "./components/CustomerDashboard/CustomerPrevOrders";
import CustomerReviews from "./components/CustomerDashboard/CustomerReviews";
import EmployeeOrders from "./components/EmployeeDashboard/EmployeeOrders";
import EmployeeReservations from "./components/EmployeeDashboard/EmployeeReservations";
import EmployeeProfile from "./components/EmployeeDashboard/EmployeeProfile";
import EmployeeReviews from "./components/EmployeeDashboard/EmployeeReviews";
import EmployeeMenu from "./components/EmployeeDashboard/EmployeeMenu";
import EmployeeLayout from "./EmployeeLayout";

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
          <Route path="/customer/viewOrders" element={<CustomerPrevOrders />} />
          <Route path="/customer/reviews" element={<CustomerReviews />} />
        </Route>

        <Route element={<EmployeeLayout />}>
          <Route path="/employee/orders" element={<EmployeeOrders />} />
          <Route
            path="/employee/reservations"
            element={<EmployeeReservations />}
          />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          <Route path="/employee/reviews" element={<EmployeeReviews />} />
          <Route path="/employee/menu" element={<EmployeeMenu />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
