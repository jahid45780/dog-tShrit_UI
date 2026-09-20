
import MyCart from "@/components/modules/user/MyCart";
import MyDashboard from "@/components/modules/user/stats/MyDashboard";
import type { ISidebarItem } from "@/types";



export const userSidebarItems:ISidebarItem[] = [
    {
    title: "My Collection",
    items: [
      

       {
        title: "My Card",
        url: "/user/my-card",
        component: MyCart
      },
       {
        title: "My Dashboard",
        url: "/user/my-dashboard",
        component: MyDashboard
      },
    ],
  },
 
  
  ]