import AddProduct from "@/components/modules/admin/AddProduct";
import type { ISidebarItem } from "@/types";


export const adminSidebarItems:ISidebarItem[] = [
    {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        // component: Analytics,
      },
  
    ],
  },
  {
    title: "Atnamina Management",
    items: [
      {
        title: "Add Product",
        url: "/admin/add-product",
        component: AddProduct,
      },
    
   
    ],
  },
  
  ]