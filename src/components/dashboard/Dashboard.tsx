import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import type { DashboardProps, PlayerDashboardStats } from "../../types/types";
import { LuSwords } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";

function Dashboard({playerId} : DashboardProps){

    const [data, setData] = useState<PlayerDashboardStats | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);

    async function getDashboardInfo(){
        setLoading(true);
        setError(null);

        const {data, error} = await supabase.from("v_player_summary").select("*").eq("player_id", playerId).single();
        if(error){
            console.error("Failed to load dashboard data:", error);
            setError("Failed to load dashboard data");
        }
        // console.log(data)
        setData(data);
    }

    useEffect(()=>{
        getDashboardInfo();
    }, [])

    const formatNumber = (value: number | string | undefined | null) => {
        if (value === undefined || value === null) return "0";
        const num = Number(value);
        if (isNaN(num)) return "0";
        return num.toLocaleString();
    };

    if(error) return <>{error}</>

    return (
        <>
        {/* <div>
            <div>
                You've been with us in {data?.scored_wars_count} wars.
            </div>
            <div>
                {
                    Boolean(data?.is_member) ? 
                    <>
                        And you're still with us (current war: #{data?.last_scored_war_number})
                    </>: 
                    <>
                        The last one was: #{data?.first_scored_war_number}
                    </>
                }
                
            </div>
            <div>
                Last one was: #{data?.last_scored_war_number}
            </div>
        </div>
        <div className="flex flex-row gap-1">
            
            <div className="border-2 w-45 h-30 rounded-xl flex flex-col justify-between items-center p-1">
                <div className="">
                    Total points:
                </div>
                <div className="text-xl">
                    {Math.floor(Number(data?.total_points))}
                </div>
                <div>
                    rank in clan: #{data?.total_points_rank}
                </div>
            </div>
            <div className="border-2 w-45 h-30 rounded-xl flex flex-col justify-between items-center p-1">
                <div className="">
                    Average points:
                </div>
                <div className="text-xl">
                    {Math.floor(Number(data?.average_points))}
                </div>
                <div>
                    rank in clan: #{data?.average_points_rank}
                </div>
            </div>
            <div className="border-2 w-45 h-30 rounded-xl flex flex-col justify-between items-center p-1">
                <div className="">
                    Last 3 wars average:
                </div>
                <div className="text-xl">
                    {data?.average_last_3}
                </div>
                <div>
                    rank in clan: #{data?.average_last_3_rank}
                </div>
            </div>
            <div className="border-2 w-45 h-30 rounded-xl flex flex-col justify-between items-center p-1">
                <div className="">
                    Lowest score:
                </div>
                <div className="h-full flex flex-col items-center justify-center">
                    <div className="text-xl">
                        {data?.lowest_points} 
                    </div>
                    <div>
                        at war number <br/> 
                        <span className="text-xl">
                            #{data?.lowest_war_number}
                        </span>
                    </div>
                </div>
            </div>
            <div className="border-2 w-45 h-30 rounded-xl flex flex-col justify-between items-center p-1">
                <div className="">
                    Highest score:
                </div>
                <div className="h-full flex flex-col items-center justify-center">
                    <div className="text-xl">
                        {data?.highest_points} 
                    </div>
                    <div>
                        at war number <br/> 
                        <span className="text-xl">
                            #{data?.highest_war_number}
                        </span>
                    </div>
                </div>
            </div>
        </div>
             */}
             <div className="flex flex-col gap-2 w-screen px-15 items-center justify-center">

                <div className="grid grid-cols-[1fr_auto_auto] items-center border-2 rounded w-[90%] h-25 shadow-lg/20 px-6">
        
                <div className="flex flex-col gap-1 justify-center items-start">
                    <div>
                        <span className="text-orange-400 text-4xl font-black">
                            {data?.nickname} 
                        </span>
                        <span className="text-xl">
                            / Dashboard
                        </span>
                    </div>
                    <div className="ml-1">
                        Your performance across clan wars.
                    </div>
                </div>

                <div className="h-16 w-[2px] bg-gray-300 mx-8"></div>

                <div className="flex flex-col gap-1 justify-center items-center">
                    <div>
                        {Boolean(data?.is_member) ? (
                            <div className="flex justify-center items-center border-2 border-green-600 bg-green-300 rounded-xl p-2">
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    <div className="flex w-3 h-3 bg-green-600 rounded-full"></div>
                                    <div className="text-green-600 text-sm font-medium">
                                        ACTIVE PLAYER
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center border-2 border-gray-600 bg-gray-300 rounded-xl p-2">
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    <div className="flex w-3 h-3 bg-gray-600 rounded-full"></div>
                                    <div className="text-gray-600 text-sm font-medium">
                                        LEFT CLAN
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <div>
                        Wars played: {data?.scored_wars_count}
                    </div> */}
                </div>

            </div>
            <div className="grid grid-cols-3 items-center border-2 rounded w-[90%] h-12 shadow-lg/20 px-6">
                <div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div>
                            <LuSwords className="text-3xl"/>
                        </div>
                        <div>
                            You've fought in <span className="font-bold text-orange-400">{data?.scored_wars_count}</span> wars
                        </div>
                    </div>
                    
                </div>
                <div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div>
                            <FaRegCalendarAlt className="text-3xl"/>
                        </div>
                        <div>
                            Last recorded war: #<span className="font-bold text-orange-400">{data?.last_scored_war_number}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div>
                            <FaRegCalendarAlt className="text-3xl"/>
                        </div>
                        <div>
                            First appearance at war: #<span className="font-bold text-orange-400">{data?.first_scored_war_number}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center w-[90%] h-30 gap-3">
                <div className="flex flex-col items-center justify-center border-2 rounded w-full h-full shadow-lg/20">
                        <div className="text-sm">
                            TOTAL POINTS
                        </div>
                        <div className="font-bold text-4xl">
                            {formatNumber(Math.floor(Number(data?.total_points)))}
                        </div>
                        <div className="bg-orange-400 rounded-lg py-1 px-2 font-bold">
                            CLAN RANK #{data?.total_points_rank}
                        </div>
                </div>
                <div className="flex flex-col items-center justify-center border-2 rounded w-full h-full shadow-lg/20">
                        <div className="text-sm">
                            AVERAGE POINTS
                        </div>
                        <div className="font-bold text-4xl">
                            {formatNumber(Math.floor(Number(data?.average_points)))}
                        </div>
                        <div className="bg-orange-400 rounded-lg py-1 px-2 font-bold">
                            CLAN RANK #{data?.average_points_rank}
                        </div>
                </div>
                <div className="flex flex-col items-center justify-center border-2 rounded w-full h-full shadow-lg/20">
                        <div className="text-sm">
                            LAST 3 WARS AVERAGE
                        </div>
                        <div className="font-bold text-4xl">
                            {formatNumber(Math.floor(Number(data?.average_last_3)))}
                        </div>
                        <div className="bg-orange-400 rounded-lg py-1 px-2 font-bold">
                            CLAN RANK #{data?.average_last_3_rank}
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;