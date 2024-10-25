import React from "react";
import EmployeeNavBar from "./components/EmployeeDashboard/EmployeeNavbar";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div>
      <EmployeeNavBar />
      <Outlet />
    </div>
  );
};

export default EmployeeLayout;
