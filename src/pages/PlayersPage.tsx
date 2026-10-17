import { useCallback, useEffect, useMemo, useState } from "react";
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


    const [sortOrder, setSortOrder] = useState<string | null>("desc");
    const [sortField, setSortField] = useState<string | null>("last_3_avg");

    function handleSort(field: string){
        if(sortField === field){
            if(sortOrder === "asc") setSortOrder("desc");
            else if(sortOrder === "desc") {
                setSortField(null);
                setSortOrder(null);
            }
        }else{
            setSortField(field);
            setSortOrder("asc");
        }
    }

    const sortedPlayers = useMemo(()=>{
        if(!sortField || !sortOrder) return players;
        return [...players].sort((a,b)=>{
            if(sortField === "nickname"){
                    const playerA = a.nickname;
                    const playerB = b.nickname;

                    return sortOrder === "asc" ? playerA.localeCompare(playerB) : playerB.localeCompare(playerA);

            }else if(sortField==="total"){
                    const playerA = a.total_points ?? 0;
                    const playerB = b.total_points ?? 0;
                    return sortOrder === "asc" ? playerA-playerB : playerB-playerA;
            }else if(sortField==="avg"){
                    const playerA = a.average_points ?? 0;
                    const playerB = b.average_points ?? 0;
                    return sortOrder === "asc" ? playerA-playerB : playerB-playerA;
            }else if(sortField==="last_3_avg"){
                    const playerA = a.average_last_3 ?? 0;
                    const playerB = b.average_last_3 ?? 0;
                    return sortOrder === "asc" ? playerA-playerB : playerB-playerA;
            }else{
                throw new Error("Unknown sort field")
            }
            return 0;
            })
        }
    , [players, sortField, sortOrder])

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
                result,
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
                result: war.result
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
    
    if(loading) return <div className="flex flex-col justify-center items-center p-6">loading...</div>
    if(error) return <div className="p-6 flex flex-col justify-center items-center gap-2">
                            <p>{error}</p>
                            <button
                                onClick={loadPlayers}
                                className="w-20 flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
                            >
                                Retry
                            </button>
                        </div>

    const baseButtonClasses = "flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black";




    return (
        <>
            <div className="min-h-full flex-1 flex-col justify-center items-center gap-2">
                <div className="flex flex-col justify-center items-center">

                    <div className="text-3xl font-bold pt-5 pb-2">
                        Players War Stats
                    </div>
                    <div className="flex flex-row gap-3">
                        <button 
                            className={`${baseButtonClasses} ${
                                selectedType === "General" 
                                    ? "bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
                                    : "bg-zinc-400 border-b-4 border-zinc-700 hover:bg-zinc-300 hover:border-zinc-500"
                            }`} 
                            onClick={() => handleTypeChange("General")}
                        >
                            General
                        </button>
                        
                        <button 
                            className={`${baseButtonClasses} ${
                                selectedType === "Wars Details" 
                                    ? "bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500" 
                                    : "bg-zinc-400 border-b-4 border-zinc-700 hover:bg-zinc-300 hover:border-zinc-500"
                            }`} 
                            onClick={() => handleTypeChange("Wars Details")}
                        >
                            Wars Details
                        </button>
                    </div>

                </div>
                
                <div className="w-full text-center">
                    
                    {selectedType === "General" ? (
                        <PlayersList players={sortedPlayers} sortHandler={handleSort} sortOrder={sortOrder} sortField={sortField}/>
                    ) : detailsLoading ? (
                        <div className="p-6">Loading war details...</div>
                    ) : detailsError ? (
                        <div className="p-6 flex flex-col justify-center items-center gap-2">
                            <p>{detailsError}</p>
                            <button
                                onClick={loadDetailedPlayers}
                                className="w-20 flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
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