import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/MainDashboard";
import ManageProduct from "../pages/Dashboard/ManageProduct";
import AddRequest from "../pages/Dashboard/AddRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            path: '/',
            Component: Home
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path: '/register',
            Component: Register
        }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard',
        element: <MainDashboard></MainDashboard>
        
      },
      {
        path: 'add-request',
        element: <AddRequest></AddRequest>
        
      },
      {
        path: 'manage-product',
        element: <ManageProduct></ManageProduct>
        
      }
    ]
  }
]);

export default router;