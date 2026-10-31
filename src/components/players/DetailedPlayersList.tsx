import { Link } from "react-router";
import type { DetailedPlayersListProps } from "../../types/types";
import { MdOpenInNew } from "react-icons/md";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

function formatCompactPoints(
    value: number | string | null | undefined
): string {
    if (value == null || value === "") return "—";

    const points = Number(value);

    if (!Number.isFinite(points)) return "—";

    if (points >= 1_000_000) {
        return `${(
            Math.round(points / 10_000) / 100
        ).toFixed(2)}m`;
    }

    if (points >= 1_000) {
        return `${Math.round(points / 1_000)}k`;
    }

    return Math.round(points).toLocaleString("pl-PL");
}

function DetailedPlayersList({
    players,
    wars,
    pointsByPlayer,
    sortOrder,
    sortField,
    sortHandler
}: DetailedPlayersListProps) {

    if (wars.length === 0) {
        return <p>No wars available.</p>;
    }

    function getSortIcon(field: string) {
        if (sortField !== field) return <FaSort />;

        if (sortOrder === "asc") return <FaSortUp />;
        if (sortOrder === "desc") return <FaSortDown />;

        return <FaSort />;
    }

    return (
        <div className="w-full min-w-0">
            <div className="
                relative
                w-full
                max-h-[70dvh]
                overflow-auto
                overscroll-contain
                rounded
                px-2 sm:px-3
                py-1 mt-1
            ">
                <table className="
                    w-max min-w-full
                    border-separate
                    border-spacing-0.5
                    text-xs sm:text-sm
                ">

                    <thead className="
                    sticky 
                    top-0 
                    z-30 
                    before:absolute 
                    before:-inset-x-1
                    before:-top-1
                    before:-bottom-0.25
                    before:-z-10 
                    before:bg-white 
                    before:content-['']">

                        <tr>

                            <th
                                rowSpan={2}
                                className="
                                    sticky left-0 top-0 z-50
                                    w-[112px] min-w-[112px]
                                    sm:w-36 sm:min-w-36
                                    border-2 px-2 sm:px-3 py-2
                                    text-center rounded-md
                                    text-sm sm:text-xl
                                    bg-white
                                "
                            >
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
                                    <span>Nickname</span>
                                    <button
                                        className="
                                            p-1 bg-zinc-300 rounded-lg
                                            text-sm hover:bg-zinc-200
                                            hover:cursor-pointer
                                            w-8 sm:w-10
                                            flex justify-center items-center
                                            ring-1 ring-black
                                            border-b-4 border-b-zinc-700
                                        "
                                        onClick={() => sortHandler("nickname")}
                                    >
                                        {getSortIcon("nickname")}
                                    </button>
                                </div>
                            </th>
                            <th
                                colSpan={wars.length}
                                className="
                                    border-2 px-3 py-3
                                    text-left sm:text-center rounded-md
                                    bg-white text-lg sm:text-xl
                                    relative
                                "
                            >
                                <span className="
                                    sticky left-27
                                    inline-block
                                    w-[calc(100vw-9rem)]
                                    sm:w-auto
                                    text-center
                                    pointer-events-none
                                ">
                                    Wars
                                </span>
                            </th>
                        </tr>
                        <tr>
                            {wars.map((war) => (
                                <th
                                    key={war.id}
                                    className={`
                                        ${war.result === "win"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }
                                        w-[84px] min-w-[84px]
                                        sm:w-20 sm:min-w-20
                                        border-2 border-black
                                        px-1 py-2
                                        text-center text-white
                                        rounded-md
                                    `}
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <span className="text-xs sm:text-sm">
                                            {war.war_number}
                                        </span>
                                        <button
                                            className={`
                                                p-1 rounded-md text-xs
                                                w-6 shrink-0
                                                flex justify-center items-center
                                                border-b-4 ring-1 ring-black
                                                text-black
                                                ${
                                                    sortField === `war:${war.war_number}`
                                                        ? (
                                                            sortOrder === "asc"
                                                                ? "bg-red-500 hover:bg-red-400 border-b-red-800"
                                                                : "bg-green-500 hover:bg-green-400 border-b-green-800"
                                                        )
                                                        : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"
                                                }
                                            `}
                                            onClick={() => sortHandler(`war:${war.war_number}`)}
                                        >
                                            {getSortIcon(`war:${war.war_number}`)}
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.player_id}>
                                <th
                                    scope="row"
                                    className={`
                                        ${player.is_member
                                            ? "bg-white"
                                            : "bg-gray-300"
                                        }
                                        sticky 
                                        left-0 
                                        z-20
                                        border-2 
                                        px-2 
                                        sm:px-3 
                                        py-2
                                        text-left 
                                        rounded-md
                                        w-[112px] 
                                        min-w-[112px]
                                        sm:w-36 
                                        sm:min-w-36
                                    `}
                                >
                                    
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 z-20">
                                        <span className="w-full text-center sm:text-left truncate text-xs sm:text-sm">
                                            {player.nickname}
                                        </span>
                                        <Link
                                            className="
                                                flex items-center justify-center
                                                gap-1 text-blue-500
                                                hover:text-blue-700
                                                text-[10px] sm:text-xs
                                                whitespace-nowrap
                                            "
                                            to={`/players/${player.nickname}`}
                                        >
                                            More <MdOpenInNew />
                                        </Link>
                                    </div>
                                </th>
                                {wars.map((war) => {
                                    const points =
                                        pointsByPlayer[player.player_id]?.[war.id];
                                    return (
                                        <td
                                            key={war.id}
                                            title={
                                                points == null
                                                    ? "No score recorded"
                                                    : `${Number(points).toLocaleString("pl-PL")} pkt`
                                            }
                                            className="
                                                border-2 px-1 sm:px-2 py-2
                                                text-center tabular-nums
                                                rounded-md
                                                whitespace-nowrap
                                                w-[84px] min-w-[84px]
                                                sm:w-20 sm:min-w-20
                                            "
                                        >
                                            {formatCompactPoints(points)}
                                        </td>
                                    );
                                })}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default DetailedPlayersList;