import { useCallback, useEffect, useState } from "react";
import type { War } from "../types/types";
import { supabase } from "../lib/supabase";
import WarsList from "../components/wars/WarsList";

function WarsPage(){
    const [wars, setWars] = useState<War[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadWars = useCallback(
        async () => {
            setLoading(true);
            setError(null);

            const {data, error} = await supabase.from("v_war_summary").select("war_id, war_number, enemy_name, status, result, min_points, max_points, tier_points_delta, participant_count, total_points, war_daily_stats (day_number, total_points)").order("war_number", {ascending: false});

            if(error){
                console.error("Failed to load wars:", error);
                setError("Failed to load wars :(");
            }else {
                // setWars(data);
                const processedWars: War[] = (data ?? []).map(
                    (war: War, index: number, array: War[]) => {
                        const candidate = array[index+1];
                        const prevWar = 
                        candidate?.war_number === war.war_number - 1 ? candidate : undefined;

                        const totalPointsGrowthPercentage = prevWar && prevWar.total_points !== 0 ? 
                        ((war.total_points - prevWar.total_points) / prevWar.total_points) * 100 : null;

                        return {
                            ...war,
                            total_points_growth_percentage: totalPointsGrowthPercentage
                        }
                    }
                )
                setWars(processedWars)
            }
            setLoading(false);
        }, []
    )

    useEffect(()=> {
        loadWars();
    }, [loadWars])

    if(loading) return <div className="flex flex-col justify-center items-center p-6">loading...</div>
    if(error) return <div className="p-6 flex flex-col justify-center items-center gap-2">
                            <p>{error}</p>
                            <button
                                onClick={loadWars}
                                className="w-20 flex flex-row justify-center items-center text-white font-bold py-2 px-4 transition duration-200 enabled:hover:cursor-pointer rounded ring-1 ring-black bg-orange-400 border-b-4 border-orange-600 hover:bg-orange-300 hover:border-orange-500"
                            >
                                Retry
                            </button>
                        </div>
    return (
        <>
        <div className="min-h-full flex-1 flex-col justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-center">
                <div className="text-3xl font-bold pt-5 pb-2">
                       Wars Stats
                </div>
            </div>
            <div className="w-full flex justify-center items-center p-6">
                <WarsList wars={wars}/>
            </div>
        </div>
        </>
    )
}
export default WarsPage;