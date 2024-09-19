import CustomerLoginForm from "./components/CustomerLoginForm/CustomerLoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CustomerRegisterForm from "./components/CustomerRegisterForm/CustomerRegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customer/login" element={<CustomerLoginForm />} />
        <Route path="/customer/register" element={<CustomerRegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
