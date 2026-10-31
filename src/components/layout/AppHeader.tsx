import { useState } from "react";
import AppNavigation from "./AppNavigation";
import applogo from "/favicon2.png";

function AppHeader() {
    const [isMenuOpened, setMenuOpened] = useState(false);

    return (
        <header className="relative w-full border-b-2 shadow-lg/20 bg-white z-50">
            <div className="h-20 flex flex-row-reverse md:flex-row px-6 items-center justify-between">

                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="font-black text-3xl">
                        FMM
                    </div>
                    <img src={applogo} alt="Logo" className="w-12 h-12 md:w-18 md:h-18 p-1 md:p-2" />
                </div>

                <div>
                    <AppNavigation 
                        isMenuOpened={isMenuOpened} 
                        setMenuOpened={setMenuOpened} 
                    />
                </div>
            </div>
        </header>
    );
}

export default AppHeader;