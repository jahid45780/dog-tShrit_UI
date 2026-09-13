import type { ISidebarItem } from "@/types";


export const userSidebarItems:ISidebarItem[] = [
    {
    title: "Transactions",
    items: [
      {
        title: "My Transactions",
        url: "/user/transactions",
        // component:MyTransactions,
      },
        {
        title: "My Wallet",
        url: "/user/wallet",
        // component:MyWallet,
      },
      {
        title: " Add Money ",
        url: "/user/add-money",
        // component:AddMoney,
      },
      {
        title: " Send Money ",
        url: "/user/send-money",
        // component:SendMoney,
      },
      {
        title: " withdraw ",
        url: "/user/withdraw",
        // component:Withdraw,
      },
       {
        title: "My Profile",
        url: "/user/profile",
        // component: Profile,
      },
    ],
  },
 
  
  ]