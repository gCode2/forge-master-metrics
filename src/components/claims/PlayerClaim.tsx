import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { PlayerClaimProps, PlayerType } from "../../types/types";
import { supabase } from "../../lib/supabase";
import PlayerClaimRow from "./PlayerClaimRow/PlayerClaimRow";

function PlayerClaim({onClaimCreated} : PlayerClaimProps){
    const {user} = useAuth();

    const [players, setPlayers] = useState<PlayerType[]>([])
    const [loading, setLoading] = useState(true);
    const [submittingPlayerId, setSubmittingPlayerId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const clanId = "ea51731c-1dea-4bda-9fdc-9e34ba16271d";

    useEffect(()=>{
        async function loadData(){
            if(!user){
                return;
            }

            setLoading(true);
            setError("");

            const {data: playersData, error: playersError} = await supabase.from("players").select("id, nickname").eq("is_member", true).order("nickname");

            if(playersError){
                console.error("Failed to load players:", error);
                setError("Failed to load players");
                setLoading(false);
                return;
            }

            setPlayers(playersData ?? []);
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
            onClaimCreated(data);
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
        <div className="flex flex-col gap-0.5 w-75">
            <div>
                Find and pick your nickname from the list below to claim your identity.
            </div>
        
            <ul className="flex flex-col gap-0.5">
            {players.map(player=>{
                return (
                    <PlayerClaimRow
                    key={player.id}
                    player={player}
                    submitting = {
                        submittingPlayerId === player.id
                    }
                    onClaim={handleClaim}
                    />
                )
            })}
            </ul>
        </div>
        </>
    )
}
export default PlayerClaim;