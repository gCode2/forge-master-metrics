import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function AppLayout(){
    return (
        <>
            <div className="w-screen max-w-full">

            
            <AppHeader/>
            <Outlet/>
            <AppFooter/>

            </div>
        </>
    )
    
}
export default AppLayout;