import { useEffect, useState } from "react";
import AppNavigation from "./AppNavigation";
import applogo from "/favicon2.png";

function AppHeader() {
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [isVisible, setVisible] = useState(true);

    useEffect(()=>{
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if(window.innerWidth > 768 || currentScrollY <=10 || isMenuOpened){
                setVisible(true);
            }else if(currentScrollY > lastScrollY){
                setVisible(false);
            }else{
                setVisible(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, [isMenuOpened])

        return (
        <header
            className={`fixed top-0 left-0 w-full z-50 border-b-2 shadow-lg/20 bg-white transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{
                paddingTop: "env(safe-area-inset-top)"
            }}
        >
            <div className="h-20 flex flex-row-reverse md:flex-row px-6 items-center justify-between">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="font-black text-3xl">
                        FMM
                    </div>

                    <img
                        src={applogo}
                        alt="Logo"
                        className="w-12 h-12 md:w-18 md:h-18 p-1 md:p-2"
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full justify-start sm:justify-end">
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