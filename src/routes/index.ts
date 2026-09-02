import App from "@/App";
import HomePage from "@/components/modules/HomePage/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter} from "react-router-dom";

export const router = createBrowserRouter([
         {
            Component:App,
            path:"/",
            children:[
               {
                 Component:HomePage,
                 index:true
            }
         ]
         },
         {
            Component:Login,
            path:"/login"
         },
           {
            Component:Register,
            path:"/register"
         }
])