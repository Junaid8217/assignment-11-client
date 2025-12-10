import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* drawer toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content p-5">
        {/* Mobile button */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Menu
        </label>

        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        {/* The Aside stays here */}
        <Aside />
      </div>
    </div>
  );
};

export default DashboardLayout;
