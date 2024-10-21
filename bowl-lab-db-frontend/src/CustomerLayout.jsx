import React from "react";
import CustomerNavbar from "./components/CustomerDashboard/CustomerNavbar";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div>
      <CustomerNavbar />
      <Outlet />
    </div>
  );
};

export default CustomerLayout;
