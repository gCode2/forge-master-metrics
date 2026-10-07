import { useEffect, useState } from "react";
import PlayerClaim from "../components/claims/PlayerClaim";
import { useAuth } from "../hooks/useAuth";
import Intro from "../components/dashboard/Intro";
import type { PlayerClaimType } from "../types/types";
import { supabase } from "../lib/supabase";
import PendingClaim from "../components/claims/PendingClaim";

function DashboardPage(){
    const {user} = useAuth();
    const [understood, setUnderstood] = useState(getUnderstand());
    const [claim, setClaim] = useState<PlayerClaimType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    function handleUnderstood(){
        setUnderstood(true);
    }

    useEffect(()=>{
        if(!user) return;
        localStorage.setItem(`onboarding_understood_${user.id}`, JSON.stringify(understood));
    }, [understood])

    useEffect(()=>{
        async function loadClaim(){
            if(!user) return;
            setLoading(true)
            setError(null);

            const {data: claimData, error: claimError} = await supabase.from("player_claims").select("id, player_id, status").eq("user_id", user.id).maybeSingle();

            if(claimError){
                console.error("Failed to load player's claim: ", error);
                setError("Failed to load player's claim")
                setLoading(false);
                return;
            }

            setClaim(claimData ?? null);
            setLoading(false);
        }
        loadClaim();
    },[user])

    function getUnderstand():boolean{
        const saved = localStorage.getItem("understood");
        if(!saved){
            return false;
        }
        try{
            const parsed = JSON.parse(saved);
            if(typeof parsed !== "boolean"){
                return false;
            }
            return parsed;
        } catch(e: unknown){
            console.error("Couldn't load data from local storage");
            return false;
        }
    }

    function handleClaimCreate(data:PlayerClaimType){
        setClaim(data);
    }
    function handleClaimRemove(){
        setClaim(null);
    }

    // function clearLocalStorage(){
    //     localStorage.clear();

    // }
    // clearLocalStorage();

    return (
        <>
            <div className="w-screen flex justify-center items-center py-6">
                <div className="flex flex-col justify-center items-center text-center gap-2 w-125">
                    <div className="text-3xl">
                        Hey <span className="text-orange-400">
                                {user?.user_metadata.display_name}
                            </span>
                    </div>
                    <div>
                        This is your dashboard page.
                    </div>
                    <div>
                        {!understood ? 

                        <Intro understoodHandler={handleUnderstood}/> :

                            (claim === null ?

                            <PlayerClaim onClaimCreated={handleClaimCreate}/> :

                            (claim.status === "pending" ? 
                            <PendingClaim claim={claim} onClaimRemove={handleClaimRemove}/> : 
                                (claim.status === "verified" ? 
                                
                                <>
                                Identity verified!
                                </>
                                :
                                <>
                                Other cases.
                                </>
                            )
                            )
                            
                            
                            )
                        }
                        </div>

                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardPage;