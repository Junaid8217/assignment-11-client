import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Help from "../pages/Help";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
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
import ProfileDonationRequestDetails from "../pages/Dashboard/ProfileDonationRequestDetails";
import EditRequest from "../pages/Dashboard/EditRequest";
import MyAllRequests from "../pages/Dashboard/MyAllRequest";
import AllRequest from "../pages/Dashboard/AllRequest";
import AllFund from "../pages/AllFund";


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
          element: <DonationRequestDetails></DonationRequestDetails> 
        },
        {
          path: '/funding-page',
          element: <PrivateRoute><AllFund></AllFund></PrivateRoute>
        },
        {
          path: '/about',
          Component: About
        },
        {
          path: '/contact',
          Component: Contact
        },
        {
          path: '/blog',
          Component: Blog
        },
        {
          path: '/help',
          Component: Help
        },
        {
          path: '/privacy-policy',
          Component: PrivacyPolicy
        },
        {
          path: '/terms-of-service',
          Component: TermsOfService
        },
        {
          path: '/health-guidelines',
          element: <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="text-center"><h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Health Guidelines</h1><p className="text-gray-600 dark:text-gray-300">Coming Soon</p></div></div>
        },
        {
          path: '/eligibility',
          element: <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="text-center"><h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Donor Eligibility</h1><p className="text-gray-600 dark:text-gray-300">Coming Soon</p></div></div>
        },
        {
          path: '/faq',
          element: <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="text-center"><h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">FAQ</h1><p className="text-gray-600 dark:text-gray-300">Coming Soon</p></div></div>
        },
        {
          path: '/cookie-policy',
          element: <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="text-center"><h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Cookie Policy</h1><p className="text-gray-600 dark:text-gray-300">Coming Soon</p></div></div>
        },
        {
          path: '/disclaimer',
          element: <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="text-center"><h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Medical Disclaimer</h1><p className="text-gray-600 dark:text-gray-300">Coming Soon</p></div></div>
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
        
      },
      {
        path: 'donation-request/:id',
        element: <ProfileDonationRequestDetails></ProfileDonationRequestDetails>
      },
      {
        path: 'edit-request/:id',
        element: <EditRequest></EditRequest>
      },
      {
        path: 'my-all-request',
        element: <MyAllRequests></MyAllRequests>
      },
      {
        path: 'all-blood-donation-request',
        element: <AllRequest></AllRequest>
      },
      
    ]
  }
]);

export default router;