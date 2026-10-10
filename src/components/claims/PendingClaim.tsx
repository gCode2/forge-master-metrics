import { useEffect, useState } from "react";
import type { PendingClaimProps, TokenType } from "../../types/types";
import { supabase } from "../../lib/supabase";

function PendingClaim({claim, onClaimRemove} : PendingClaimProps){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [claimedUserNickname, setClaimedUserNickname] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false);
    const [token, setToken] = useState<TokenType | null>(null);
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

        const {
            data: playerData, 
            error: playerError} = 
            await supabase
            .from("players")
            .select("nickname")
            .eq("id", claim.player_id)
            .single();

        if(playerError){
            console.error("Failed to load claimed player nickname:", playerError);
            setError("Failed to load claimed player nickname");
            setLoading(false);
            return;
        }
        const {
            data: claimData, 
            error: claimError} = 
            await supabase
            .from("player_claims")
            .select("verification_code, expires_at")
            .eq("id", claim.id)
            .single();

        if(claimError){
            console.error("Failed to load claim token:", claimError);
            setError("Failed to load claim token");
            setLoading(false);
            return;
        }
        setClaimedUserNickname(playerData.nickname);
        setToken(claimData);
        setLoading(false);

    }
    useEffect(()=>{
        getClaimDetails();
    }, [claim])
    return (
    <>
        <div>
            <div className="font-bold text-xl">
                Claim success!
            </div>
            <div>
                You've made a claim to be 
                <span className="font-bold text-green-500">
                    {" "+claimedUserNickname}
                </span>
            </div>
            <div>
                <div>
                    Your verification token: {token?.verification_code}
                </div>
                <div>
                    To get your identity approved, please copy your verification token and sent it using one of the following methods:
                </div>
                <div>
                    <ol className="list-decimal flex flex-col gap-1">
                        <li>
                            Paste it in the in-game chat so the Clan Leader can see it.
                        </li>
                        <li>
                            Send it to <span className="p-0.5 rounded bg-blue-200 text-">💬・chat-ogólny</span> in our Discord
                        </li>
                        <li>
                            Send it via DM to <span className="p-0.5 rounded bg-blue-200 text-">@gcode2</span> in Discord
                        </li>
                    </ol>
                </div>
                
            </div>
            <div>
                Claim status: 
                <span className="text-orange-500">
                    {" "+claim.status}
                </span>
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