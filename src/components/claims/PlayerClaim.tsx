import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { PlayerClaimProps, PlayerType } from "../../types/types";
import { supabase } from "../../lib/supabase";
import PlayerClaimRow from "./PlayerClaimRow/PlayerClaimRow";
import { FunctionsHttpError } from "@supabase/supabase-js";

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

        const {data, error} = await supabase.functions.invoke(
            'create-player-claim',
            {
                body: {player_id: id}
            }
        )
        if (error) {
            console.error("Claim function error:", error);

            if (error instanceof FunctionsHttpError) {
                const details = await error.context.json();
                console.error("Edge Function response:", details);
            }

            setError("Could not create a claim");
            return;
        }else{
            onClaimCreated(data);
        }
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