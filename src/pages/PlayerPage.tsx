import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PlayerStats, PlayerWarHistory } from "../types/types";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useNavigate, useParams } from "react-router";

function PlayerPage() {
    const { nickname } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<PlayerStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [warHistory, setWarHistory] = useState<PlayerWarHistory[]>([]);

    async function getPlayerInfo() {
        setLoading(true);
        setError(null);

        const { data, error } =
            await supabase.from("v_player_summary")
                .select("*")
                .eq("nickname", nickname)
                .single();

        if (error) {
            console.error("Failed to load dashboard data:", error);
            setError("Failed to load dashboard data");
        }

        setData(data);
        setLoading(false);
    }

    async function getWarHistory() {
        const { data, error } =
            await supabase.from("players")
                .select(`id, v_player_war_history ( war_number, points)`)
                .eq("nickname", nickname).single();

        if (error) {
            console.error("Failed to load war history:", error);
            setError("Failed to load war history");
            navigate("/players");
        }

        setWarHistory(data?.v_player_war_history ?? []);
    }

    useEffect(() => {
        getPlayerInfo();
        getWarHistory();
    }, []);

    const formatNumber = (value: number | string | undefined | null) => {
        if (value === undefined || value === null) return "0";
        const num = Number(value);
        if (isNaN(num)) return "0";
        return num.toLocaleString();
    };

    if (error) {
        return (
            <div className="h-full flex flex-col justify-center items-center">
                {error}
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full flex flex-col justify-center items-center">
                Loading...
            </div>
        );
    }

    const tickInterval = Math.max(
        0,
        Math.ceil(warHistory.length / 5) - 1
    );

    return (
        <main className="flex w-full p-6">
            <div className="flex flex-col w-full min-w-0 gap-4">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-2 rounded-xl shadow-lg/20 p-4 sm:px-6 sm:py-5">

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="text-orange-400 text-3xl sm:text-4xl font-black break-all">
                                {data?.nickname}
                            </span>

                            <span className="text-lg sm:text-xl">
                                / Player Page
                            </span>
                        </div>

                        <div className="text-sm text-left sm:text-base mt-1">
                            Player's performance across clan wars.
                        </div>
                    </div>

                    <div className="flex items-center sm:justify-end">
                        {Boolean(data?.is_member) ? (
                            <div className="flex items-center gap-2 border-2 border-green-600 bg-green-100 rounded-xl px-3 py-2">
                                <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                                <span className="text-green-700 text-xs sm:text-sm font-bold whitespace-nowrap">
                                    ACTIVE PLAYER
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 border-2 border-gray-500 bg-gray-200 rounded-xl px-3 py-2">
                                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full" />
                                <span className="text-gray-600 text-xs sm:text-sm font-bold whitespace-nowrap">
                                    LEFT CLAN
                                </span>
                            </div>
                        )}
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">

                    <div className="flex items-center gap-3 border-2 rounded-xl shadow-lg/20 p-3 sm:p-4 justify-center">
                        <img src="/icons/swords.png" className="w-8 h-8 shrink-0" />

                        <div className="text-sm">
                            Fought in{" "}
                            <span className="font-bold text-orange-400">
                                {data?.scored_wars_count}
                            </span>{" "}
                            wars
                        </div>
                    </div>

                    <div className="flex items-center gap-3 border-2 rounded-xl shadow-lg/20 p-3 sm:p-4 justify-center">
                        <img src="/icons/calendar.png" className="w-8 h-8 shrink-0" />

                        <div className="text-sm">
                            Last recorded war:{" "}
                            <span className="font-bold text-orange-400">
                                #{data?.last_scored_war_number}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 border-2 rounded-xl shadow-lg/20 p-3 sm:p-4 justify-center">
                        <img src="/icons/number-1.png" className="w-8 h-8 shrink-0" />

                        <div className="text-sm">
                            First appearance:{" "}
                            <span className="font-bold text-orange-400">
                                #{data?.first_scored_war_number}
                            </span>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">

                    <div className="flex flex-col items-center justify-center border-2 rounded-xl shadow-lg/20 p-3 sm:p-4 min-w-0">
                        <div className="text-xs sm:text-sm text-center">
                            TOTAL POINTS
                        </div>

                        <div className="font-black text-2xl sm:text-4xl my-1">
                            {formatNumber(Math.floor(Number(data?.total_points)))}
                        </div>

                        <div className="text-[10px] sm:text-sm bg-orange-400 rounded-lg py-1 px-2 font-bold text-center">
                            CLAN RANK #{data?.total_points_rank}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-2 rounded-xl shadow-lg/20 p-3 sm:p-4 min-w-0">
                        <div className="text-xs sm:text-sm text-center">
                            AVERAGE POINTS
                        </div>

                        <div className="font-black text-2xl sm:text-4xl my-1">
                            {formatNumber(Math.floor(Number(data?.average_points)))}
                        </div>

                        <div className="text-[10px] sm:text-sm bg-orange-400 rounded-lg py-1 px-2 font-bold text-center">
                            CLAN RANK #{data?.average_points_rank}
                        </div>
                    </div>

                    <div className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center border-2 rounded-xl shadow-lg/20 p-3 sm:p-4 min-w-0">
                        <div className="text-xs sm:text-sm text-center">
                            LAST 3 WARS AVERAGE
                        </div>

                        <div className="font-black text-2xl sm:text-4xl my-1">
                            {formatNumber(Math.floor(Number(data?.average_last_3)))}
                        </div>

                        <div className="text-[10px] sm:text-sm bg-orange-400 rounded-lg py-1 px-2 font-bold text-center">
                            CLAN RANK #{data?.average_last_3_rank}
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="flex flex-col border-2 rounded-xl shadow-lg/20 p-3 sm:p-5 lg:col-span-2 min-w-0">

                        <div className="flex items-center gap-3 mb-3">
                            <img
                            src="/icons/bar-chart.png"
                            className="w-9 h-9 sm:w-11 sm:h-11"
                            />

                            <div>
                                <div className="font-bold text-lg text-left sm:text-xl">
                                    WAR HISTORY
                                </div>

                                <div className="text-xs sm:text-sm text-gray-500">
                                    Points scored in each war
                                </div>
                            </div>
                        </div>

                        {warHistory.length > 0 ? (
                            <div className="w-full min-w-0 h-[260px] sm:h-[300px]">

                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={warHistory}
                                        margin={{
                                            top: 15,
                                            right: 10,
                                            left: -10,
                                            bottom: 5
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#e5e7eb"
                                        />

                                        <XAxis
                                            dataKey="war_number"
                                            tickFormatter={(value) => `#${value}`}
                                            interval={tickInterval}
                                            tick={{ fontSize: 12 }}
                                            tickMargin={8}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            tickFormatter={(value) => {
                                                if (value >= 1_000_000) {
                                                    return `${(value / 1_000_000).toFixed(1)}M`;
                                                }

                                                if (value >= 1_000) {
                                                    return `${(value / 1_000).toFixed(0)}k`;
                                                }

                                                return value;
                                            }}
                                            width={45}
                                            tick={{ fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "10px",
                                                border: "1px solid #e5e7eb",
                                                fontSize: "12px"
                                            }}
                                            labelFormatter={(value) => `War #${value}`}
                                            formatter={(value) => [
                                                Number(value).toLocaleString(),
                                                "Points"
                                            ]}
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="points"
                                            stroke="#f97316"
                                            strokeWidth={3}
                                            dot={{ r: 3, fill: "#f97316" }}
                                            activeDot={{
                                                r: 6,
                                                fill: "#f97316",
                                                stroke: "#fff",
                                                strokeWidth: 2
                                            }}
                                            connectNulls={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-[260px] text-sm text-gray-400">
                                No war history available.
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                        <div className="flex items-center justify-between gap-2 border-2 rounded-xl shadow-lg/20 p-4 bg-green-50 min-w-0">
                            <img
                            src="/icons/trophy.png"
                            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm sm:text-base">
                                    PERSONAL BEST
                                </div>

                                <div className="font-semibold">
                                    {formatNumber(Math.floor(Number(data?.highest_points)))} points
                                </div>

                                <div className="text-zinc-500 text-xs">
                                    in War #{data?.highest_war_number}
                                </div>
                            </div>
                            <div className="hidden sm:block text-[10px] font-bold text-green-700 bg-green-200 border border-green-600 rounded-lg px-2 py-1 text-center">
                                BEST SCORE
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 border-2 rounded-xl shadow-lg/20 p-4 bg-gray-100 min-w-0">
                            <img
                            src="/icons/broken-shield.png"
                            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm sm:text-base">
                                    LOWEST SCORE
                                </div>
                                <div className="font-semibold">
                                    {formatNumber(Math.floor(Number(data?.lowest_points)))} points
                                </div>
                                <div className="text-zinc-500 text-xs">
                                    in War #{data?.lowest_war_number}
                                </div>
                            </div>
                            <div className="hidden sm:block text-[10px] font-bold text-gray-600 bg-gray-300 border border-gray-500 rounded-lg px-2 py-1 text-center">
                                LOWEST
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 border-2 rounded-xl shadow-lg/20 p-4 min-w-0 sm:col-span-2 lg:col-span-1">
                            <img
                            src="/icons/clan.png"
                            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm sm:text-base">
                                    CLAN STATS
                                </div>
                                <div className="text-xs text-gray-500">
                                    Check clan performance
                                </div>
                            </div>
                            <div className="text-xs font-bold text-orange-500 border-2 border-orange-500 rounded-lg py-2 px-3 whitespace-nowrap">
                                SEE MORE
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PlayerPage;