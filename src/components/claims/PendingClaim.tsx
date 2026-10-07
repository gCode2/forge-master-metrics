import { useEffect, useState } from "react";
import type { PendingClaimProps } from "../../types/types";
import { supabase } from "../../lib/supabase";

function PendingClaim({claim, onClaimRemove} : PendingClaimProps){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [claimedUserNickname, setClaimedUserNickname] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false);
    async function handleCancel(claimId: string){
        if(!claim) return;
        setSubmitting(true);
        setError("");

        const {error} = await supabase.from("player_claims").delete().eq("id", claimId);

        if(error){
            console.error("Failed to cancel player claim:", error);
            setError(error.message);
            return;
        }
        onClaimRemove();
    }
    async function getClaimDetails(){
        if(!claim) return;
        setLoading(true);
        setError(null);

        const {data: playerData, error: playerError} = await supabase.from("players").select("nickname").eq("id", claim.player_id).single();

        if(playerError){
            console.error("Failed to load claimed player nickname:", playerError);
            setError("Failed to load claimed player nickname");
            setLoading(false);
            return;
        }
        setClaimedUserNickname(playerData.nickname);
        setLoading(false);

    }
    useEffect(()=>{
        getClaimDetails();
    }, [claim])
    return (
    <>
        <div>
            <div className="font-bold text-xl">
                Success!
            </div>
            <div>
                You've made a claim to be 
                <span className="font-bold text-green-500">
                    {" "+claimedUserNickname}
                </span>
            </div>
            <div>
                Claim status: 
                <span className="text-orange-500">
                    {" "+claim.status}
                </span>
            </div>
            <div>
                Admin is reviewing your claim.
            </div>
            <div>
                <button
                        type="button"
                        className="bg-gray-400 hover:bg-gray-300 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-400 transition duration-200 hover:cursor-pointer rounded ring-1 ring-black text-sm"
                        onClick={()=>handleCancel(claim.id)}
                        disabled={submitting}
                    >
                        {submitting ? 'Canceling...' : 'Cancel'}
                    </button>
            </div>
        </div>
    </>
    )
}
export default PendingClaim;