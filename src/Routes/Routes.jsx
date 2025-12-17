import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dashboard/MainDashboard";

import AddRequest from "../pages/Dashboard/AddRequest";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers";
import MyRequest from "../pages/Dashboard/MyRequest";
import Donate from "../pages/Donate";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import SearchRequest from "../pages/SearchRequest";
import DonationRequest from "../pages/DonationRequest";
import DonationRequestDetails from "../pages/DonationRequestDetails";


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
          element: <PrivateRoute><Donate></Donate></PrivateRoute>
        },
        {
          path: '/payment-success',
          Component: PaymentSuccess
        },
        {
          path: '/payment-cancelled',
          Component: PaymentCancel
        },
        {
          path: '/search',
          Component: SearchRequest
        },
        {
          path: '/donation-request',
          Component: DonationRequest
        },
        {
          path: '/donation-request-details/:id',
          element: <PrivateRoute><DonationRequestDetails></DonationRequestDetails></PrivateRoute>
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