import { IoIosArrowDropdown } from "react-icons/io";
import type { WarRowProps } from "../../types/types";
import { useState } from "react";

function formatCompactNumber(
    value: number | string | undefined | null
): string {
    if (value == null || value === "") return "0";

    const num = Number(value);

    if (!Number.isFinite(num)) return "0";

    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}m`;
    }

    if (num >= 1_000) {
        return `${Math.round(num / 1_000)}k`;
    }

    return Math.round(num).toLocaleString("pl-PL");
}

function WarRow({ war }: WarRowProps) {
    const [isExpanded, setExpanded] = useState(false);

    function handleExpand() {
        setExpanded(prev=>!prev);
    }

    const isWin = war.result === "win";

    return (
        <div className="
            grid grid-cols-2 md:grid-cols-6
            gap-x-3 gap-y-3
            p-3 sm:p-4
            border-2 rounded-xl
            shadow-lg/20
            items-center text-center
            min-w-0
        ">

            <div className="text-left md:text-center">
                <span className="block text-[10px] text-gray-500 md:hidden">
                    War Number
                </span>
                <span className="font-bold text-base sm:text-lg">
                    #{war.war_number}
                </span>
            </div>

            <div className="min-w-0 text-right md:text-center">
                <span className="block text-[10px] text-gray-500 md:hidden">
                    Enemy Clan
                </span>
                <span className="font-semibold truncate block">
                    {war.enemy_name}
                </span>
            </div>

            <div className="col-span-2 md:col-span-1">
                <span className="block text-xl font-bold md:hidden">
                    Total Points
                </span>

                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-lg tabular-nums">
                        {formatCompactNumber(war.total_points)}
                    </span>

                    {war.total_points_growth_percentage != null ? (
                        <span className={`
                            text-xs sm:text-sm font-bold whitespace-nowrap
                            ${war.total_points_growth_percentage > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                        `}>
                            ({war.total_points_growth_percentage > 0 ? "+" : ""}
                            {war.total_points_growth_percentage.toFixed(2)}%)
                        </span>
                    ) : (
                        <span className="text-xs font-bold text-gray-400">
                            ( - )
                        </span>
                    )}
                </div>
            </div>

            <div>
                <span className="block text-[10px] md:hidden">
                    War Result
                </span>

                <span className={`
                    inline-flex justify-center items-center
                    min-w-16 px-3 py-1
                    border-2 rounded-lg
                    text-white font-bold text-sm
                    ${isWin
                        ? "bg-green-500 border-green-600"
                        : war.result === "loss"
                            ? "bg-red-500 border-red-700"
                            : "bg-gray-500 border-gray-600"
                    }
                `}>
                    {war.result}
                </span>
            </div>

            <div>
                <span className="block text-[10px] md:hidden">
                    Participants
                </span>
                <span className="font-semibold text-lg">
                    {war.participant_count}
                </span>
            </div>

            <div className="col-span-2 md:col-span-1 flex justify-center">
                <button
                    className="
                        flex justify-between items-center gap-2
                        bg-zinc-400 enabled:hover:bg-zinc-300
                        text-white font-bold
                        py-2 px-4
                        border-b-4 border-zinc-700
                        enabled:hover:border-zinc-500
                        transition duration-200
                        enabled:hover:cursor-pointer
                        rounded-lg ring-1 ring-black
                        w-full md:w-35
                    "
                    onClick={handleExpand}
                >
                    <span className="flex-1">
                        {isExpanded ? "Less info" : "More info"}
                    </span>

                    <IoIosArrowDropdown
                        className={`
                            text-xl transition-transform duration-200
                            ${isExpanded ? "rotate-180" : "rotate-0"}
                        `}
                    />
                </button>
            </div>
            <div
                className={`
                    col-span-2 md:col-span-6
                    grid transition-[grid-template-rows] duration-300 ease-in-out
                    ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
            >
                <div className="overflow-hidden min-h-0">
                    <div className={`
                        rounded-lg p-3 sm:p-4
                        border-3
                        ${isWin
                            ? "bg-green-100 border-green-300"
                            : "bg-red-100 border-red-300"
                        }
                    `}>

                        <h3 className="font-bold text-md sm:text-base mb-3">
                            Daily Stats
                        </h3>

                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {war.war_daily_stats
                                .slice()
                                .sort((a, b) => a.day_number - b.day_number)
                                .map(warDay => (
                                    <div
                                        key={warDay.day_number}
                                        className="
                                            bg-white/80
                                            rounded-lg border-1 border-black
                                            p-2 sm:p-3
                                            flex flex-col items-center gap-1
                                            min-w-0
                                        "
                                    >
                                        <span className="text-xs font-bold">
                                            Day {warDay.day_number}
                                        </span>

                                        <span className="
                                            font-bold text-sm sm:text-base
                                            tabular-nums
                                        ">
                                            {formatCompactNumber(warDay.total_points)}
                                        </span>

                                        {warDay.growth_percentage != null ? (
                                            <span className={`
                                                text-[10px] sm:text-xs font-bold
                                                whitespace-nowrap
                                                ${warDay.growth_percentage > 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }
                                            `}>
                                                {warDay.growth_percentage > 0 ? "+" : ""}
                                                {Math.min(
                                                    warDay.growth_percentage,
                                                    1000
                                                ).toFixed(2)}%
                                            </span>
                                        ) : (
                                            <span className="text-[10px] sm:text-xs text-gray-400">
                                                —
                                            </span>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarRow;