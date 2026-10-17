import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PlayerStats, PlayerWarPoints, WarColumn } from "../types/types";
import PlayersList from "../components/players/PlayersList";
import DetailedPlayersList from "../components/players/DetailedPlayersList";

function PlayersPage(){
    const [players, setPlayers] = useState<PlayerStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState("General");

    const [wars, setWars] = useState<WarColumn[]>([]);
    const [pointsByPlayer, setPointsByPlayer] =
        useState<PlayerWarPoints>({});

    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState<string | null>(null);
    const [detailsLoaded, setDetailsLoaded] = useState(false);

    const loadPlayers = useCallback(
        async () => {
            setLoading(true);
            setError(null);

            const {data, error} = await supabase.from("v_player_summary").select("*");

            if(error){
                console.error("Failed to load players:", error);
                setError("Failed to load players");
            }else{
                setPlayers(data);
            }
            setLoading(false);
        }, []
    );

    const loadDetailedPlayers = useCallback(async () => {
    setDetailsLoading(true);
    setDetailsError(null);

    try {
        const { data, error } = await supabase
            .from("wars")
            .select(`
                id,
                war_number,
                war_participants (
                    player_id,
                    points
                )
            `)
            .order("war_number", { ascending: false });

        if (error) {
            throw error;
        }

        const warRows = data ?? [];

        const nextPoints: PlayerWarPoints = {};

        for (const war of warRows) {
            for (const participant of war.war_participants ?? []) {
                if (!nextPoints[participant.player_id]) {
                    nextPoints[participant.player_id] = {};
                }

                nextPoints[participant.player_id][war.id] =
                    participant.points == null
                        ? null
                        : Number(participant.points);
            }
        }

        setWars(
            warRows.map((war) => ({
                id: war.id,
                war_number: war.war_number,
            }))
        );

        setPointsByPlayer(nextPoints);
        setDetailsLoaded(true);

    } catch (error) {
        console.error("Failed to load detailed list:", error);
        setDetailsError("Failed to load detailed list.");
    } finally {
        setDetailsLoading(false);
    }
}, []);

    useEffect(()=>{
        loadPlayers();
    }, [loadPlayers]);

    useEffect(()=>{
        if(selectedType === "Wars Details" && !detailsLoaded){
            loadDetailedPlayers();
        }
    }, [selectedType, detailsLoaded, loadDetailedPlayers])

    function handleTypeChange(type: string){
        setSelectedType(type);
    }
    
    if(loading) return <div className="h-full flex flex-col justify-center items-center">loading...</div>
    if(error) return <div className="h-full flex flex-col justify-center items-center">{error}</div>

    const baseButtonClasses = "flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black";

    return (
        <>
            <div className="min-h-full flex flex-col justify-center items-center gap-2">
                <div className="text-2xl font-bold p-3">
                    Players War Stats
                </div>
                <div className="flex flex-row gap-3">
                    <button 
                        className={`${baseButtonClasses} ${
                            selectedType === "General" 
                                ? "bg-blue-600 border-b-4 border-blue-800 hover:bg-blue-500 hover:border-blue-700" 
                                : "bg-zinc-400 border-b-4 border-zinc-700 hover:bg-zinc-300 hover:border-zinc-500"
                        }`} 
                        onClick={() => handleTypeChange("General")}
                    >
                        General
                    </button>
                    
                    <button 
                        className={`${baseButtonClasses} ${
                            selectedType === "Wars Details" 
                                ? "bg-blue-600 border-b-4 border-blue-800 hover:bg-blue-500 hover:border-blue-700" 
                                : "bg-zinc-400 border-b-4 border-zinc-700 hover:bg-zinc-300 hover:border-zinc-500"
                        }`} 
                        onClick={() => handleTypeChange("Wars Details")}
                    >
                        Wars Details
                    </button>
                </div>
                <div className="w-full text-center">
                    {selectedType === "General" ? (
                        <PlayersList players={players} />
                    ) : detailsLoading ? (
                        <div className="p-6">Loading war details...</div>
                    ) : detailsError ? (
                        <div className="p-6">
                            <p>{detailsError}</p>
                            <button
                                onClick={loadDetailedPlayers}
                                className="mt-2 rounded bg-blue-600 px-4 py-2 text-white"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <DetailedPlayersList
                            players={players}
                            wars={wars}
                            pointsByPlayer={pointsByPlayer}
                        />
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default PlayersPage;