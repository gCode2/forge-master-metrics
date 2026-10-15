import AppNavigation from "./AppNavigation";

function AppHeader(){
    return (
        <>
            <div className="h-20 border-b-2 flex flex-row px-6 items-center justify-between shadow-lg/20">
                <div>
                    <AppNavigation/>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="font-black text-red text-3xl">
                        FMM
                    </div>
                    <img src="./favicon2.png" className="w-18 h-18 p-2"/>
                </div>
            </div>
        </>
    )
}
export default AppHeader;