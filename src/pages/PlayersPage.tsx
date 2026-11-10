import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PlayerStats, PlayerWarPoints, SortField, WarColumn } from "../types/types";
import PlayersList from "../components/players/PlayersList";
import DetailedPlayersList from "../components/players/DetailedPlayersList";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "../components/players/SearchBar";

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

    const [searchText, setSearchText] = useState("");

    const [showAbsentPlayers, setShowAbsentPlayers] = useState(()=>{
        const savedValue = localStorage.getItem("showAbsentPlayers");

        return savedValue === null ? true : savedValue === "true";
    })

    useEffect(()=>{
        localStorage.setItem("showAbsentPlayers", String(showAbsentPlayers))
    }, [showAbsentPlayers]);

    const [sortOrder, setSortOrder] = useState<string | null>("desc");
    const [sortField, setSortField] = useState<SortField | null>("last_3_avg");

    const {claimedPlayerId} = useAuth();

    function handleSort(field: SortField){
        if(sortField === field){
            if(sortOrder === "desc") setSortOrder("asc");
            else if(sortOrder === "asc") {
                setSortField(null);
                setSortOrder(null);
            }
        }else{
            setSortField(field);
            setSortOrder("desc");
        }
    }

    const sortedPlayers = useMemo(()=>{
        if(!sortField || !sortOrder) return players;
        return [...players].sort((a,b)=>{
            if(sortField === "nickname"){
                    const playerA = a.nickname;
                    const playerB = b.nickname;

                    return sortOrder === "asc" ? playerA.localeCompare(playerB) : playerB.localeCompare(playerA);
            }
            if(sortField.startsWith("war:")){
                const warNumber = parseInt(sortField.slice(4));

                const war = wars.find(
                    (war) => war.war_number === warNumber
                );

                if(!war) return 0;

                const pointsA = pointsByPlayer[a.player_id]?.[war.id];
                const pointsB = pointsByPlayer[b.player_id]?.[war.id];

                if(pointsA == null && pointsB == null) return 0;
                if(pointsA == null) return 1;
                if(pointsB == null) return -1;

                return sortOrder === "asc" ? 
                pointsA - pointsB :
                pointsB - pointsA;
            }

            const getValue = (player: PlayerStats): number => {
                switch(sortField){
                    case "total":
                        return player.total_points ?? 0;
                    case "avg":
                        return player.average_points ?? 0;
                    case "last_3_avg":
                        return player.average_last_3 ?? 0;
                    default:
                        return 0;
                }
            }

            const result = getValue(a) - getValue(b);

            return sortOrder === "asc" ? result : -result;
            })
        }
    , [players, sortField, sortOrder, pointsByPlayer, wars])


    const filteredPlayers = useMemo(() => {
        const normalizedSearch = searchText.trim().toLowerCase();

        return sortedPlayers.filter(player => {
            const matchesNickname = player.nickname
                .toLowerCase()
                .includes(normalizedSearch);

            return matchesNickname && (showAbsentPlayers || player.is_member);
        });
    }, [sortedPlayers, searchText, showAbsentPlayers]);

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
                <div className="flex flex-col justify-center items-center gap-3">

                    <div className="text-3xl font-bold pt-5 pb-2">
                        Players War Stats
                    </div>
                    <div>
                        <SearchBar searchText={searchText} changeHandler={setSearchText}/>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 sm:gap-3 self-center sm:self-auto shrink-0">
                                        <span className={`text-sm ${!showAbsentPlayers ? "text-gray-500" : "font-bold text-gray-900"}`}>
                                            {!showAbsentPlayers ? "Absent hidden" : "Absent visible"}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setShowAbsentPlayers(prev => !prev)}
                                            className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                                                showAbsentPlayers ? "bg-orange-500" : "bg-gray-400"
                                            }`}
                                            aria-label="Toggle absent players visibility"
                                            aria-pressed={showAbsentPlayers}
                                        >
                                            <span
                                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
                                                    showAbsentPlayers ? "translate-x-8" : "translate-x-0"
                                                }`}
                                            />
                                        </button>
                                    </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button 
                            className={`${baseButtonClasses} ${
                                selectedType === "General" 
                                    ? "bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
                                    : "bg-zinc-400 border-b-4 border-zinc-600 hover:bg-zinc-300 hover:border-zinc-500"
                            }`} 
                            onClick={() => handleTypeChange("General")}
                        >
                            General
                        </button>
                        
                        <button 
                            className={`${baseButtonClasses} ${
                                selectedType === "Wars Details" 
                                    ? "bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500" 
                                    : "bg-zinc-400 border-b-4 border-zinc-600 hover:bg-zinc-300 hover:border-zinc-500"
                            }`} 
                            onClick={() => handleTypeChange("Wars Details")}
                        >
                            Wars Details
                        </button>
                    </div>

                </div>
                
                <div className="w-full text-center">
                    
                    {selectedType === "General" ? (
                        <PlayersList players={filteredPlayers} sortHandler={handleSort} sortOrder={sortOrder} sortField={sortField} claimedPlayerId={claimedPlayerId}/>
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
                            players={filteredPlayers}
                            wars={wars}
                            pointsByPlayer={pointsByPlayer}
                            sortOrder={sortOrder}
                            sortField={sortField}
                            sortHandler={handleSort}
                            claimedPlayerId={claimedPlayerId}
                        />
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default PlayersPage;