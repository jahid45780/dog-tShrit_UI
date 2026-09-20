
import MyCart from "@/components/modules/user/MyCart";
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
    ],
  },
 
  
  ]