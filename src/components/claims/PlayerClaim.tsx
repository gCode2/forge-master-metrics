import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { PlayerClaimType, PlayerType } from "../../types/types";
import { supabase } from "../../lib/supabase";
import PlayerClaimRow from "./PlayerClaimRow/PlayerClaimRow";

function PlayerClaim(){
    const {user} = useAuth();

    const [players, setPlayers] = useState<PlayerType[]>([])
    const [claims, setClaims] = useState<PlayerClaimType[]>([])
    const [loading, setLoading] = useState(true);
    const [submittingPlayerId, setSubmittingPlayerId] = useState<string | null>(null);
    const [error, setError] = useState("");

    const clanId = "ea51731c-1dea-4bda-9fdc-9e34ba16271d";

    useEffect(()=>{
        async function loadData(){
            if(!user){
                return;
            }

            setLoading(true);
            setError("");

            const 
            [{
                data: playersData, 
                error: playersError
            }, 
            {
                data: claimsData, 
                error: claimsError
            }] = await Promise.all([
                supabase
                    .from("players")
                    .select("id, nickname")
                    .eq("is_member", true)
                    .order("nickname"),
                supabase
                    .from("player_claims")
                    .select("id, player_id, status")
                    .eq("user_id", user.id)
            ]);
            if(playersError){
                console.error("Failed to load players:", error);
                setError("Failed to load players");
                setLoading(false);
                return;
            }
            if(claimsError){
                console.error("Failed to load claims:", error);
                setError("Failed to load claims");
                setLoading(false);
                return;
            }
            setPlayers(playersData ?? []);
            setClaims(claimsData ?? []);
            setLoading(false);
        }
        loadData();
    }, [user])

    async function handleClaim(id: string){
        if(!user) return;

        setSubmittingPlayerId(id);
        setError("");

        

        const {data, error} = await supabase.from('player_claims').insert({
            user_id: user?.id,
            player_id: id,
            clan_id: clanId,
            status: "pending"
        })
        .select("id, player_id, status")
        .single();


        if(error){
            console.error("Failed to create player claim:", error);
            setError(error.message);
        }else{
            setClaims(prev=>[...prev, data]);
        }
        setSubmittingPlayerId(null);
    }

    async function handleCancel(claimId: string){
        const claim = claims.find(claim=>claim.id === claimId);

        if(!claim) return;

        setSubmittingPlayerId(claim.player_id);
        setError("");

        const {error} = await supabase.from("player_claims").delete().eq("id", claimId);

        if(error){
            console.error("Failed to cancel player claim:", error);
            setError(error.message);
        }else{
            setClaims(prev=>prev.filter(claim=>claim.id !== claimId));
        }
        setSubmittingPlayerId(null);
    }

    if(error){
        return (
            <>{error}</>
        )
    }
    if(loading){
        return (
            <>
             Loading...
            </>
        )
    }

    return (
        <>
            <ul className="flex flex-col gap-0.5 w-75">
            {players.map(player=>{
                const claim = claims.find(claim=>claim.player_id===player.id);
                return (
                    <PlayerClaimRow
                    key={player.id}
                    player={player}
                    claim={claim}
                    submitting = {
                        submittingPlayerId === player.id
                    }
                    onClaim={handleClaim}
                    onCancel={handleCancel}
                    />
                )
            })}
            </ul>
        </>
    )
}
export default PlayerClaim;