import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import type { DashboardProps, PlayerDashboardStats, PlayerWarHistory } from "../../types/types";
import { LuShieldAlert, LuSwords } from "react-icons/lu";
import { FaRegCalendarAlt, FaStarHalfAlt } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { IoIosPeople, IoMdTrophy } from "react-icons/io";
import { FaPeopleGroup, FaShieldHalved, FaStar } from "react-icons/fa6";
import { HiTrendingDown } from "react-icons/hi";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function Dashboard({playerId} : DashboardProps){

    const [data, setData] = useState<PlayerDashboardStats | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [warHistory, setWarHistory] = useState<PlayerWarHistory[]>([])

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

    async function getWarHistory(){
        const {data, error} = await supabase.from("v_player_war_history").select("war_number, points").eq("player_id", playerId);
        if(error){
            console.error("Failed to load war history:", error);
            setError("Failed to load war history");
        }
        // console.log(data)
        setWarHistory(data ?? []);
    }

    useEffect(()=>{
        getDashboardInfo();
        getWarHistory();
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
            <div className="flex flex-row items-center w-[90%] h-27 gap-3">
                <div className="flex flex-col items-center justify-center border-2 rounded w-full h-full shadow-lg/20">
                        <div className="text-sm">
                            TOTAL POINTS
                        </div>
                        <div className="font-black text-4xl">
                            {formatNumber(Math.floor(Number(data?.total_points)))}
                        </div>
                        <div className="bg-orange-400 rounded-lg py-0.5 px-2 font-bold">
                            CLAN RANK #{data?.total_points_rank}
                        </div>
                </div>
                <div className="flex flex-col items-center justify-center border-2 rounded w-full h-full shadow-lg/20">
                        <div className="text-sm">
                            AVERAGE POINTS
                        </div>
                        <div className="font-black text-4xl">
                            {formatNumber(Math.floor(Number(data?.average_points)))}
                        </div>
                        <div className="bg-orange-400 rounded-lg py-0.5 px-2 font-bold">
                            CLAN RANK #{data?.average_points_rank}
                        </div>
                </div>
                <div className="flex flex-col items-center justify-center border-2 rounded w-full h-full shadow-lg/20">
                        <div className="text-sm">
                            LAST 3 WARS AVERAGE
                        </div>
                        <div className="font-black text-4xl">
                            {formatNumber(Math.floor(Number(data?.average_last_3)))}
                        </div>
                        <div className="bg-orange-400 rounded-lg py-0.5 px-2 font-bold">
                            CLAN RANK #{data?.average_last_3_rank}
                        </div>
                </div>
                
            </div>
            <div className="grid grid-cols-3 items-center w-[90%] gap-3">
                        <div className="flex flex-col border-2 rounded h-81 shadow-lg/20 col-span-2 px-6 py-3 gap-2">
                        <div className="flex flex-row items-center justify-left gap-3 h-15 px-5">
                            <div>
                                <IoStatsChart className="text-4xl text-orange-400 drop-shadow-sm/150"/>
                            </div>
                            <div>
                                <div className="font-bold text-xl">
                                WAR HISTORY
                                </div>
                                <div className="text-sm">
                                Points scored in each war
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-56">
                            <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
                                <LineChart data={warHistory} margin={{top: 16, right:20, left:12, bottom: 8}}className="focus:outline-none">
                                    <CartesianGrid vertical={true} horizontal={true} />
                                    <XAxis 
                                        style={{ fontSize: "10px" }} 
                                        dataKey="war_number" 
                                        tickFormatter={(value) => `War #${value}`} 
                                        interval={0} // Wymusza pokazanie wszystkich etykiet na osi X
                                    />
                                    <YAxis 
                                        tickFormatter={(value) => {
                                            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
                                            if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
                                            return value;
                                        }}
                                        width={50}
                                    />
                                    <Tooltip
                                        labelFormatter={(value) => `War #${value}`}
                                        formatter={(value) => [
                                            Number(value).toLocaleString(),
                                            "Points",
                                        ]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="points"
                                        stroke="#f97316"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                        connectNulls={false}
                                    />
                                </LineChart> 
                            </ResponsiveContainer>
                        </div>
                            </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row items-center justify-between gap-2 border-2 rounded h-25 shadow-lg/20 px-6 bg-green-50">

                                <div>
                                    {/* <IoMdTrophy className="text-5xl text-orange-400 drop-shadow-sm/150"/> */}
                                    <FaStar className="text-4xl text-orange-400 drop-shadow-sm/150"/>
                                </div>
                                <div className="flex-2 flex-col justify-left text-left px-2">
                                    <div className="font-bold text-md stext-stroke-3">
                                    PERSONAL BEST
                                    </div>
                                    <div>
                                        {formatNumber(Math.floor(Number(data?.highest_points)))} points
                                    </div>
                                    <div className="text-zinc-500 text-xs">
                                        in War <span className="font-bold">#{data?.highest_war_number}</span>
                                    </div>
                                </div>
                                <div className="justify-center items-center border-2 border-green-600 bg-green-300 rounded-lg py-1 px-2">
                                    
                                        <div className="text-green-600 text-sm font-medium">
                                            HIGHEST SCORE
                                        </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-2 border-2 rounded h-25 shadow-lg/20 px-6 bg-gray-100">

                                <div>
                                    <FaStarHalfAlt className="text-4xl text-gray-400 drop-shadow-sm/150"/>
                                </div>
                                <div className="flex-2 flex-col justify-left text-left px-2">
                                    <div className="font-bold text-md stext-stroke-3">
                                        LOWEST SCORE
                                    </div>
                                    <div>
                                        {formatNumber(Math.floor(Number(data?.lowest_points)))} points
                                    </div>
                                    <div className="text-zinc-500 text-xs">
                                        in War <span className="font-bold">#{data?.lowest_war_number}</span>
                                    </div>
                                </div>
                                <div className="justify-center items-center border-2 border-gray-500 bg-gray-300 rounded-lg py-1 px-2">
                                    
                                        <div className="text-gray-500 text-sm font-medium">
                                            LOWEST SCORE
                                        </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-2 border-2 rounded h-25 shadow-lg/20 px-6">

                                <div>
                                    <IoIosPeople className="text-4xl text-orange-400 drop-shadow-sm/150"/>
                                </div>
                                <div className="flex-2 flex-col justify-left text-left px-2">
                                    <div className="font-bold text-md stext-stroke-3">
                                        CLAN STATS
                                    </div>
                                </div>
                                <div className="justify-center items-center border-2 border-orange-500 rounded-lg py-1 px-2">
                                    
                                        <div className="text-orange-500 text-sm font-medium">
                                            SEE MORE
                                        </div>
                                </div>
                            </div>
                        </div>
                        
            </div>
        </div>
        </>
    )
}

export default Dashboard;