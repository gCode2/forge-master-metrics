
import { useEffect, useState } from "react";
import {
    canInstall,
    installPwa,
    subscribeInstall
} from "../../lib/pwaInstall";

const DISMISSED_KEY = "forge-pwa-install-prompt-dismissed";

function PwaInstallPrompt() {
    const [dismissed, setDismissed] = useState(
        () => localStorage.getItem(DISMISSED_KEY) === "true"
    );

    const [installAvailable, setInstallAvailable] = useState(canInstall());
    const [isIos, setIsIos] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as Navigator & {
                standalone?: boolean;
            }).standalone === true;

        setIsStandalone(standalone);

        const ua = window.navigator.userAgent;

        setIsIos(
            /iPad|iPhone|iPod/.test(ua) &&
            !("MSStream" in window)
        );

        return subscribeInstall(() => {
            setInstallAvailable(canInstall());
        });
    }, []);
    const closePrompt = () => {
        localStorage.setItem(DISMISSED_KEY, "true");
        setDismissed(true);
    };

    const handleInstall = async () => {
        await installPwa();
    };

    if (dismissed || isStandalone) {
        return null;
    }

    if (!installAvailable && !isIos) {
        return null;
    }

    return (
        <aside className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/95 p-4 text-white shadow-2xl backdrop-blur">

            <div className="min-w-0 flex-1">
                <p className="font-semibold">
                    Forge Master Metrics
                </p>

                {isIos ? (
                    <p className="mt-1 text-sm text-zinc-300">
                        To install: tap "Share" in Safari, then "Add to Home Screen"
                    </p>
                ) : (
                    <p className="mt-1 text-sm text-zinc-300">
                         Add the app to your home screen to launch it like a native app
                    </p>
                )}
            </div>

            {installAvailable && (
                <button
                    onClick={handleInstall}
                    className="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
                >
                    Install
                </button>
            )}

            <button
                onClick={closePrompt}
                aria-label="Close installation prompt"
                className="shrink-0 rounded-lg px-2 py-2 text-zinc-300 hover:bg-white/10"
            >
                ✕
            </button>

        </aside>
    );
}

export default PwaInstallPrompt;
