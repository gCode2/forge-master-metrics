import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";
import { type PlayerClaimStatus } from "../../types/types";

function VerifiedRoute() {
    const { user, loading: authLoading } = useAuth();

    const [claimStatus, setClaimStatus] = useState<PlayerClaimStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(()=>{
        let active = true;
        async function loadClaim(){
            if(!user){
                setClaimStatus(null);
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(false);

            const {data, error} = await supabase.rpc("get_my_claim");
            if(!active) return;
            if(error){
                console.error("Failed to load claim:", error);
                setError(true);
                setLoading(false);
                return;
            }
            setClaimStatus(data?.[0]?.status ?? null);
            setLoading(false);
        }
        if(!authLoading) {
            void loadClaim();
        }
        return ()=> {
            active = false;
        };
    }, [user, authLoading]);
    if(authLoading || loading){
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        )
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Failed to verify your claim. Please try again.
            </div>
        );
    }
    if (claimStatus !== "verified") {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}

export default VerifiedRoute;