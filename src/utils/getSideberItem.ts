import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItemes";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { IRole } from "@/types";



export const getSidebarItems = (userRole:IRole)=>{

   switch (userRole) {  
    case role.ADMIN:
        return [...adminSidebarItems]
    case role.USER:
        return [...userSidebarItems];
    default:
        return[];
   }

}