import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
   
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      
      <div className="drawer-content p-5">
      
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Menu
        </label>

        <Outlet />
      </div>

     
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

       
        <Aside />
      </div>
    </div>
  );
};

export default DashboardLayout;
