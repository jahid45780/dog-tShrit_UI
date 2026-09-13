import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { getSidebarItems } from "@/utils/getSideberItem"
import { Sidebar, SidebarContent, SidebarRail } from "./ui/sidebar"
import { NavMain } from "./nav-main"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const {data: userData} = useUserInfoQuery(undefined)
  
  const data = {
  // navMain:adminSidebarItems
  navMain:getSidebarItems(userData?.data?.role)
}

  return (
    <Sidebar collapsible="icon" {...props} className="border-[#193452] bg-[#0B1A33]">
        
      <SidebarContent className="min-h-screen bg-[#07152B] text-white">
          <NavMain items={data.navMain} />  
       
      </SidebarContent>
    
      <SidebarRail />
    </Sidebar>
  )
}