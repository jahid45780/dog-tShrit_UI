import AddProduct from "@/components/modules/admin/AddProduct";
import AdminDashboard from "@/components/modules/admin/AdminDashboard";
import ContactSettings from "@/components/modules/admin/ContactSettings";
import OrdersStats from "@/components/modules/admin/OrdersStats";
import ProductAll from "@/components/modules/admin/ProductAll";
import SeoAudit from "@/components/modules/admin/SeoAudit";
import SystemHealth from "@/components/modules/admin/SystemHealth";
import TrackingSettings from "@/components/modules/admin/TrackingSettings";
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

    {
    title: "SEO",
    items: [
      {
        title: "SEO Audit",
        url: "/admin/seo-audit",
        component: SeoAudit,
      },
    ],
  },

    {
    title: "Tracking Settings",
    items: [
      {
        title: "Tracking Settings",
        url: "/admin/tracking",
        component: TrackingSettings,
      },
    ],
  },

   {
    title: "Contact Settings",
    items: [
      {
        title: "Contact Settings",
        url: "/admin/contact",
        component: ContactSettings,
      },
    ],
  },
  
  ]