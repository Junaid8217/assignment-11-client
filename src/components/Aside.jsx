import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
} from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const Aside = () => {
  const activeClass = "bg-primary text-white rounded-lg";

  const {role} = useContext(AuthContext)

  // Close drawer on mobile
  const closeDrawer = () => {
    const drawer = document.getElementById("dashboard-drawer");
    if (drawer) drawer.checked = false;
  };

  const handleLogout = () => {
    signOut(auth)
  }

  return (
    <aside className="w-64 bg-base-200 min-h-screen p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      {/* Menu */}
      <ul className="menu space-y-2 text-lg flex-1">

        <li>
          <NavLink
            to="/dashboard"
            onClick={closeDrawer}
            className={"flex items-center gap-3 p-2"}
          >
            <FiHome /> My Profile
          </NavLink>
        </li>

        {
          role == 'Donor' && (<li>
          <NavLink
            to="/dashboard/add-request"
            onClick={closeDrawer}
            className={({ isActive }) =>
              "flex items-center gap-3 p-2" +
              (isActive ? " " + activeClass : "")
            }
          >
            <FiHome /> Add Request
          </NavLink>
        </li>)
        }

        {
          role == 'Admin' && (<li>
          <NavLink
            to="/dashboard/all-users"
            onClick={closeDrawer}
            className={({ isActive }) =>
              "flex items-center gap-3 p-2" +
              (isActive ? " " + activeClass : "")
            }
          >
            <FiHome /> All Users
          </NavLink>
        </li>)
        }

        <li>
          <NavLink
            to="/dashboard/my-request"
            onClick={closeDrawer}
            className={({ isActive }) =>
              "flex items-center gap-3 p-2" +
              (isActive ? " " + activeClass : "")
            }
          >
            <FiHome /> My Request
          </NavLink>
        </li>
      </ul>

      {/* Logout at bottom */}
      <button
        onClick={() => {
          handleLogout();
          closeDrawer();
          window.location.href = "/login";
        }}
        className="flex items-center gap-3 p-2 text-lg hover:bg-error hover:text-white rounded-lg"
      >
        <FiLogOut /> Logout
      </button>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="flex items-center gap-3 p-2 text-lg hover:bg-emerald-600 hover:text-white rounded-lg"
      >
        <IoHome /> Home
      </button>
    </aside>
  );
};

export default Aside;
