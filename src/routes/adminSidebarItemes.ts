import AddProduct from "@/components/modules/admin/AddProduct";
import AdminDashboard from "@/components/modules/admin/AdminDashboard";
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
    
   
    ],
  },

   {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/admin/all-users",
        component: AddProduct,
      },
    
   
    ],
  },
  
  ]