import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import type { PlayerClaimType } from "../types/types";
import Intro from "../components/dashboard/Intro";
import PlayerClaim from "../components/claims/PlayerClaim";
import PendingClaim from "../components/claims/PendingClaim";

function DashboardPage() {
    const { user } = useAuth();
    const storageKey = user ? `onboarding_understood_${user.id}` : null;

    const [understood, setUnderstood] = useState(
        () => (storageKey ? localStorage.getItem(storageKey) === "true" : false)
    );
    const [claim, setClaim] = useState<PlayerClaimType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadClaim = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.rpc("get_my_claim");

        if (error) {
            console.error("Failed to load player's claim:", error);
            setError("Failed to load player's claim");
        } else {
            setClaim(data?.[0] ?? null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadClaim();
    }, [loadClaim]);

    function handleUnderstood() {
        if (storageKey) localStorage.setItem(storageKey, "true");
        setUnderstood(true);
    }

    function renderStep() {
        if (loading) return <>Loading...</>;
        if (error) return <>{error}</>;

        if (claim?.status === "pending") {
            return <PendingClaim claim={claim} onClaimRemove={loadClaim} />;
        }
        if (claim?.status === "verified") {
            return <>Identity verified!</>;
        }
        if (!understood) {
            return <Intro understoodHandler={handleUnderstood} />;
        }
        return <PlayerClaim onClaimCreated={loadClaim} />;
    }

    return (
        <div className="w-screen flex justify-center items-center py-6">
            <div className="flex flex-col justify-center items-center text-center gap-2 w-125">
                <div className="text-3xl">
                    Hey <span className="text-orange-400">{user?.user_metadata.display_name}</span>
                </div>
                <div>This is your dashboard page.</div>
                <div>{renderStep()}</div>
            </div>
        </div>
    );
}
export default DashboardPage;