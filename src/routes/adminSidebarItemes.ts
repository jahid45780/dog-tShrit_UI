import AddProduct from "@/components/modules/admin/AddProduct";
import AdminDashboard from "@/components/modules/admin/AdminDashboard";
import OrdersStats from "@/components/modules/admin/OrdersStats";
import ProductAll from "@/components/modules/admin/ProductAll";
import SystemHealth from "@/components/modules/admin/SystemHealth";
import UserManagement from "@/components/modules/admin/UserManagement";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems:ISidebarItem[] = [
    {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: AdminDashboard,
      },

       {
        title: "Orders",
        url: "/admin/orders",
        component: OrdersStats,
      },

      
  
    ],
  },
  {
    title: "Product Management",
    items: [
      {
        title: "Add Product",
        url: "/admin/add-product",
        component: AddProduct,
      },

       {
        title: "All Product",
        url: "/admin/products",
        component:ProductAll,
      },
    
   
    ],
  },

   {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/admin/all-users",
        component: UserManagement,
      },
        
    ],
  },

     {
    title: "System Health",
    items: [
      {
        title: "webSite Health ",
        url: "/admin/system-health",
        component: SystemHealth,
      },
    ],
  },
  
  ]