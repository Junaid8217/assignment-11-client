import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dashboard/MainDashboard";
import ManageProduct from "../pages/Dashboard/ManageProduct";
import AddRequest from "../pages/Dashboard/AddRequest";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers";
import MyRequest from "../pages/Dashboard/MyRequest";
import Donate from "../pages/Donate";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";

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
        },
        {
          path: '/donate',
          Component: Donate
        },
        {
          path: '/payment-success',
          Component: PaymentSuccess
        },
        {
          path: '/payment-cancelled',
          Component: PaymentCancel
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
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
        path: 'all-users',
        element: <AllUsers></AllUsers>
        
      },
      {
        path: 'my-request',
        element: <MyRequest></MyRequest>
        
      }
    ]
  }
]);

export default router;