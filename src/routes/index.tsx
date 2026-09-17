

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
]);