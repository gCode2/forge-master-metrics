import { useEffect, useState } from "react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import type { PlayerClaimProps, PlayerType } from "../../types/types";
import PlayerClaimRow from "./PlayerClaimRow/PlayerClaimRow";

function PlayerClaim({ onClaimCreated }: PlayerClaimProps) {
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [loading, setLoading] = useState(true);
    const [submittingPlayerId, setSubmittingPlayerId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPlayers() {
            const { data, error } = await supabase.rpc("list_claimable_players");

            if (error) {
                console.error("Failed to load players:", error);
                setError("Failed to load players");
            } else {
                setPlayers(data ?? []);
            }
            setLoading(false);
        }
        loadPlayers();
    }, []);

    async function handleClaim(playerId: string) {
        setSubmittingPlayerId(playerId);
        setError(null);

        const { error } = await supabase.functions.invoke("create-player-claim", {
            body: { player_id: playerId },
        });

        setSubmittingPlayerId(null);

        if (error) {
            console.error("Claim function error:", error);
            if (error instanceof FunctionsHttpError) {
                console.error("Edge Function response:", await error.context.json());
            }
            setError("Could not create a claim");
            return;
        }
        onClaimCreated(); // Dashboard pobierze claima z get_my_claim
    }

    if (loading) return <>Loading...</>;

    return (
        <div className="flex flex-col gap-0.5 w-75">
            <div>Find and pick your nickname from the list below to claim your identity.</div>
            {error && <div className="text-red-500">{error}</div>}
            <ul className="flex flex-col gap-0.5">
                {players.map((player) => (
                    <PlayerClaimRow
                        key={player.id}
                        player={player}
                        submitting={submittingPlayerId === player.id}
                        onClaim={handleClaim}
                    />
                ))}
            </ul>
        </div>
    );
}
export default PlayerClaim;