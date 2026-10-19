// import { useAuth } from "../../hooks/useAuth";
import AppNavigation from "./AppNavigation";
import applogo from "/public/favicon2.png";

function AppHeader(){
    // const {user} = useAuth();
    return (
        <>
            <div className="h-20 border-b-2 flex flex-row px-6 items-center justify-between shadow-lg/20">
                
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="font-black text-red text-3xl">
                        FMM
                    </div>
                    <img src={applogo} className="w-18 h-18 p-2"/>
                </div>
                {/* <div className="text-orange-400 font-black text-2xl">
                    {user?.user_metadata.display_name}
                </div> */}
                <div>
                    <AppNavigation/>
                </div>
            </div>
        </>
    )
}
export default AppHeader;