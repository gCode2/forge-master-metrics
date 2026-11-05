
import { useEffect, useState } from "react";
import { IoMenu, IoClose, IoDownloadOutline } from "react-icons/io5";
import {
    canInstall,
    installPwa,
    subscribeInstall
} from "../../lib/pwaInstall";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { NavLink, useNavigate } from "react-router";
import type { AppNavigationProps } from "../../types/types";

function AppNavigation({ isMenuOpened, setMenuOpened }: AppNavigationProps) {
    const { user } = useAuth();

    const navigate = useNavigate();

    const [installAvailable, setInstallAvailable] = useState(canInstall());
    const [isIos, setIsIos] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showInstallHelp, setShowInstallHelp] = useState(false);

    useEffect(() => {
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as Navigator & {
                standalone?: boolean;
            }).standalone === true;

        setIsStandalone(standalone);

        setIsIos(
            /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
            !("MSStream" in window)
        );

        return subscribeInstall(() => {
            setInstallAvailable(canInstall());
        });
    }, []);

    async function handleInstall() {
        if (canInstall()) {
            setShowInstallHelp(false);

            const installed = await installPwa();

            if (installed) {
                setIsStandalone(true);
            }

            return;
        }

        setShowInstallHelp((previous) => !previous);
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        setMenuOpened(false);
        navigate("/login");
    }

    const closeMenu = () => {
        setMenuOpened(false);
        setShowInstallHelp(false);
    };

    const buttonStyles =
        "flex flex-row justify-center items-center text-white font-bold py-2 px-4 border-b-4 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black w-full md:w-auto text-center";


    const getNavLinkStyles = ({ isActive }: { isActive:boolean }) => `${buttonStyles} ${
        isActive
            ? "bg-orange-400 border-orange-600 hover:bg-orange-300 hover:border-orange-400"
            : "bg-zinc-400 hover:bg-zinc-300 border-zinc-600 hover:border-zinc-500"
    }`;

    return (
        <>
            <div className="flex flex-col justify-center md:hidden">
                <button
                    onClick={() => setMenuOpened(!isMenuOpened)}
                    aria-label="Toggle Menu"
                    className="p-1 focus:outline-none"
                >
                    {isMenuOpened ? (
                        <IoClose className="text-4xl" />
                    ) : (
                        <IoMenu className="text-4xl" />
                    )}
                </button>
            </div>

            <div
                className={`
                    absolute top-full left-0 w-full bg-white border-b-2 shadow-xl p-4 flex-col gap-3 z-40
                    ${isMenuOpened ? "flex" : "hidden"}
                    md:static md:flex md:flex-row md:w-auto md:bg-transparent md:border-none md:shadow-none md:p-0
                `}
            >
                <NavLink
                    to={user ? "/dashboard" : "/"}
                    className={getNavLinkStyles}
                    onClick={closeMenu}
                >
                    Home
                </NavLink>

                {user ? (
                    <>
                        <NavLink
                            to="/players"
                            className={getNavLinkStyles}
                            onClick={closeMenu}
                        >
                            Players
                        </NavLink>
                        <NavLink
                            to="/wars"
                            className={getNavLinkStyles}
                            onClick={closeMenu}
                        >
                            Wars
                        </NavLink>
                        <NavLink
                            to="/charts"
                            className={getNavLinkStyles}
                            onClick={closeMenu}
                        >
                            Charts
                        </NavLink>
                        <NavLink
                            to="/calculators"
                            className={getNavLinkStyles}
                            onClick={closeMenu}
                        >
                            Calculators
                        </NavLink>
                        <button className={`${buttonStyles} bg-red-400 hover:bg-red-300 border-red-600 hover:border-red-500`} onClick={handleLogout}>
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={getNavLinkStyles}
                            onClick={closeMenu}
                        >
                            Log in
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={getNavLinkStyles}
                            onClick={closeMenu}
                        >
                            Sign up
                        </NavLink>
                    </>
                )}

                {!isStandalone && (
                    <button
                        onClick={handleInstall}
                        className={`${buttonStyles} gap-2 bg-blue-400 hover:bg-blue-300 border-blue-600 hover:border-blue-500`}
                        aria-label="Install application"
                    >
                        <IoDownloadOutline className="text-xl" />
                        <span>Install</span>
                    </button>
                )}

                {showInstallHelp && (
                    <div className="w-full md:absolute md:top-full md:right-0 md:mt-2 md:w-72 rounded-lg bg-zinc-100 p-3 text-sm text-zinc-700 shadow-lg">
                        {isIos
                            ? 'To install: tap Share in Safari, then select "Add to Home Screen".'
                            : installAvailable
                                ? "Click Install to open the installation window."
                                : 'To install this app, open your browser menu and select "Install app" or "Add to Home Screen".'}
                    </div>
                )}
            </div>
        </>
    );
}

export default AppNavigation;
