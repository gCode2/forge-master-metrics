
import { useEffect, useState } from "react";
import { IoMenu, IoClose, IoDownloadOutline } from "react-icons/io5";
import {
    canInstall,
    installPwa,
    subscribeInstall
} from "../../lib/pwaInstall";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router";
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
        "flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-300 text-white font-bold py-2 px-4 border-b-4 border-zinc-700 hover:border-zinc-500 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black w-full md:w-auto text-center";

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
                    absolute top-20 left-0 w-full bg-white border-b-2 shadow-xl p-4 flex-col gap-3 z-40
                    ${isMenuOpened ? "flex" : "hidden"}
                    md:static md:flex md:flex-row md:w-auto md:bg-transparent md:border-none md:shadow-none md:p-0
                `}
            >
                <Link
                    to={user ? "/dashboard" : "/"}
                    className={buttonStyles}
                    onClick={closeMenu}
                >
                    Home
                </Link>

                {user ? (
                    <>
                        <Link to="/players" className={buttonStyles} onClick={closeMenu}>
                            Players
                        </Link>
                        <Link to="/wars" className={buttonStyles} onClick={closeMenu}>
                            Wars
                        </Link>
                        <Link to="/charts" className={buttonStyles} onClick={closeMenu}>
                            Charts
                        </Link>
                        <Link to="/calculators" className={buttonStyles} onClick={closeMenu}>
                            Calculators
                        </Link>
                        <button className={buttonStyles} onClick={handleLogout}>
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={buttonStyles} onClick={closeMenu}>
                            Log in
                        </Link>
                        <Link to="/register" className={buttonStyles} onClick={closeMenu}>
                            Sign up
                        </Link>
                    </>
                )}

                {!isStandalone && (
                    <button
                        onClick={handleInstall}
                        className={`${buttonStyles} gap-2`}
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
