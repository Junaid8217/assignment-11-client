import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/MainDashboard";
import AddProduct from "../pages/Dashboard/AddProduct";
import ManageProduct from "../pages/Dashboard/ManageProduct";

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
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'main',
        element: <MainDashboard></MainDashboard>
        
      },
      {
        path: 'add-product',
        element: <AddProduct></AddProduct>
        
      },
      {
        path: 'manage-product',
        element: <ManageProduct></ManageProduct>
        
      }
    ]
  }
]);

export default router;