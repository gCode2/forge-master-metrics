import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import PwaInstallPrompt from "./PwaInstallPrompt";

function AppLayout(){
    return (
        <>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
                <AppHeader/>
                <Outlet/>
                <AppFooter/>
            </div>
            <PwaInstallPrompt/>
        </>
    )
    
}
export default AppLayout;