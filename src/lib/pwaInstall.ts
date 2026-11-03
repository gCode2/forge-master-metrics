
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();

        deferredPrompt = event as BeforeInstallPromptEvent;
        notify();
    });

    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        notify();
    });
}

export function subscribeInstall(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function canInstall() {
    return deferredPrompt !== null;
}

export async function installPwa() {
    if (!deferredPrompt) {
        return false;
    }

    const event = deferredPrompt;
    deferredPrompt = null;
    notify();

    await event.prompt();

    const choice = await event.userChoice;

    notify();

    return choice.outcome === "accepted";
}
