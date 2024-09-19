import LoginForm from "./components/LoginForm/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CustomerRegisterForm from "./components/RegisterForm/CustomerRegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customer/login" element={<LoginForm />} />
        <Route path="/customer/register" element={<CustomerRegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
