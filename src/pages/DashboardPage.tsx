import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import type { PlayerClaimType } from "../types/types";
import Intro from "../components/dashboard/Intro";
import PlayerClaim from "../components/claims/PlayerClaim";
import PendingClaim from "../components/claims/PendingClaim";
import getOnboardingStep from "../features/onboarding/getOnboardingStep";
import Dashboard from "../components/dashboard/Dashboard";

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

        const step = getOnboardingStep(claim, understood);

        switch(step){
            case "intro":
                return <Intro understoodHandler={handleUnderstood} />
            case "choose-player":
                return <PlayerClaim onClaimCreated={loadClaim} />
            case "pending":
                return <PendingClaim claim={claim!} onClaimRemove={loadClaim} />
            case "verified":
                return <Dashboard playerId={claim!.player_id}/>
        
        }
    }

    if(loading) return <div className="h-full flex flex-col justify-center items-center">Loading...</div>;
    
    return (
        <main className="flex flex-1 w-full p-6">
            <div className="flex flex-col text-center gap-2 w-full">
                {getOnboardingStep(claim, understood) !== "verified" && (
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Hey{" "}
                        <span className="text-orange-400">
                            {user?.user_metadata.display_name}
                        </span>
                    </h1>

                    <p className="mt-2 text-slate-400">
                        This is your dashboard page.
                    </p>
                </div>
            )}
                <div className="w-full flex justify-center items-center">{renderStep()}</div>
            </div>
        </main>
    );
}
export default DashboardPage;