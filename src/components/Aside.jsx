import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from "react-icons/fi";

const Aside = () => {
  const activeClass = "bg-primary text-white rounded-lg";

  // Close drawer on mobile
  const closeDrawer = () => {
    const drawer = document.getElementById("dashboard-drawer");
    if (drawer) drawer.checked = false;
  };

  return (
    <aside className="w-64 bg-base-200 min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <ul className="menu space-y-2 text-lg">

        <li>
          <NavLink
            to="/dashboard/main"
            onClick={closeDrawer}
            className={({ isActive }) =>
              "flex items-center gap-3 p-2" + (isActive ? " " + activeClass : "")
            }
          >
            <FiHome /> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/add-product"
            onClick={closeDrawer}
            className={({ isActive }) =>
              "flex items-center gap-3 p-2" + (isActive ? " " + activeClass : "")
            }
          >
            <FiHome /> Add Product
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/manage-product"
            onClick={closeDrawer}
            className={({ isActive }) =>
              "flex items-center gap-3 p-2" + (isActive ? " " + activeClass : "")
            }
          >
            <FiHome /> Manage Product
          </NavLink>
        </li>

        {/* more links... */}
      </ul>
    </aside>
  );
};

export default Aside;
