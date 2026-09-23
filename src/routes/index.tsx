

import App from "@/App";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import HomePage from "@/components/modules/HomePage/HomePage";
import { role } from "@/constants/role";
import Collections from "@/pages/Collections";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Shop from "@/pages/Shop";
import type { IRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { adminSidebarItems } from "./adminSidebarItemes";
import { userSidebarItems } from "./userSidebarItems";
import CollectionsDetalis from "@/pages/CollectionsDetalis";
import Checkout from "@/pages/Checkout";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentPending from "@/pages/payment/PaymentPending";
import PaymentCancel from "@/pages/payment/PaymentCancel";
import MyOrders from "@/components/modules/user/MyOrders";
import MyOrderDetails from "@/components/modules/user/MyOrderDetails";
import Profile from "@/pages/Profile";
import Unauthorized from "@/components/modules/Authorization/Unauthorized";
import NotFound from "@/components/modules/Authorization/NotFound";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: Shop,
        path: "shop",
      },
      {
        Component: Collections,
        path: "collections",
      },
        {
        Component: CollectionsDetalis,
        path: "/product/:id",
      },
      {
        Component: Checkout,
        path: "/checkout"
      },
      {
        Component: PaymentSuccess,
        path:"/payment/success"
      },
        {
        Component: PaymentPending,
        path:"/payment/pending"
      },
      {
        Component: PaymentCancel,
        path:"/payment/cancel"
      },
       
      {
        Component: Profile,
        path:"/profile"
      },

       
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.ADMIN as IRole),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" replace />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.USER as IRole),
    path: "/user",
    children: [
       {
        index: true,
        element: <Navigate to="/user/my-dashboard" replace />,
      },
      ...generateRoutes(userSidebarItems),
    ],
  },

  {
    Component: Login,
    path: "/login",
  },

  {
    Component: Register,
    path: "/register",
  },
   {
        Component: MyOrders,
        path:"/my-bookings"
   },
    {
        Component: MyOrderDetails,
        path:"/my-bookings/:id"
   },
    {
        Component: Unauthorized,
        path: "unauthorized",
      },

  
      {
        Component: NotFound,
        path: "*",
      },
     
]);