import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import type { PlayersListProps, SortField } from "../../types/types";
import PlayerRow from "./PlayerRow";
import { Link } from "react-router";
import { MdOpenInNew } from "react-icons/md";

function PlayersList({
    players,
    sortHandler,
    sortOrder,
    sortField
}: PlayersListProps) {

    const columns: { label: string; mobileLabel: string; field: SortField }[] = [
        { label: "Nickname", mobileLabel: "Nickname", field: "nickname" },
        { label: "Total points", mobileLabel: "Total", field: "total" },
        { label: "Average points", mobileLabel: "Average", field: "avg" },
        { label: "Last 3 average", mobileLabel: "Last 3", field: "last_3_avg" }
    ];

    function getSortIcon(field: SortField) {
        if (sortField !== field) return <FaSort />;
        if (sortOrder === "asc") return <FaSortUp />;
        if (sortOrder === "desc") return <FaSortDown />;

        return <FaSort />;
    }

    function getSortClasses(field: SortField) {
        const active = sortField === field;

        if (!active) {
            return "bg-zinc-200 border-b-zinc-600 hover:bg-zinc-300";
        }

        return sortOrder === "asc"
            ? "bg-red-400 border-b-red-700 hover:bg-red-300"
            : "bg-green-500 border-b-green-700 hover:bg-green-400";
    }

    const formatNumber = (
        value: number | string | undefined | null
    ) => {
        if (value == null) return "0";

        const num = Number(value);

        if (isNaN(num)) return "0";

        return Math.floor(num).toLocaleString();
    };

    return (
        <div className="w-full min-w-0 px-2 sm:px-3 mt-5 sm:mt-0">

            <div className="grid grid-cols-2 gap-2 mb-3 sm:hidden">

                {columns.map((column) => (
                    <button
                        key={column.field}
                        onClick={() => sortHandler(column.field)}
                        className={`
                            flex items-center justify-between gap-2
                            px-3 py-2 rounded-lg
                            border border-black border-b-4
                            text-sm font-bold
                            transition-colors
                            ${getSortClasses(column.field)}
                        `}
                    >
                        <span>{column.mobileLabel}</span>
                        <span className="shrink-0">
                            {getSortIcon(column.field)}
                        </span>
                    </button>
                ))}

            </div>

            <div className="flex flex-col gap-2 sm:hidden mb-5 sm:mb-0">

                {players.map((player) => (
                    <div
                        key={player.player_id}
                        className={`
                            border-2 rounded-xl
                            shadow-sm p-3
                            ${player.is_member ? "bg-white" : "bg-gray-200"}
                        `}
                    >

                        <div className="flex items-center justify-between gap-3 mb-3">

                            <div className="flex items-center gap-2 min-w-0">

                                <div className="min-w-0">
                                    <div className="font-bold text-base text-left truncate">
                                        {player.nickname}
                                    </div>

                                    <div className={`text-[10px] font-bold text-left ${
                                        player.is_member
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }`}>
                                        {player.is_member ? "ACTIVE PLAYER" : "LEFT CLAN"}
                                    </div>
                                </div>

                            </div>

                            <Link
                                to={`/players/${player.nickname}`}
                                className="
                                    shrink-0 flex items-center gap-1
                                    bg-orange-400 hover:bg-orange-300
                                    border-b-4 border-orange-600
                                    rounded-lg px-3 py-2
                                    text-xs font-bold text-white ring-1 ring-black
                                "
                            >
                                MORE <MdOpenInNew size={14} />
                            </Link>

                        </div>

                        <div className="grid grid-cols-3 gap-2">

                            <div className="bg-zinc-100 rounded-lg p-2 text-center min-w-0 border-1">
                                <div className="text-[10px] sm:text-xs text-gray-500 font-semibold">
                                    TOTAL
                                </div>

                                <div className="font-black text-sm sm:text-base tabular-nums break-words">
                                    {formatNumber(player.total_points)}
                                </div>
                            </div>

                            <div className="bg-zinc-100 rounded-lg p-2 text-center min-w-0 border-1">
                                <div className="text-[10px] sm:text-xs text-gray-500 font-semibold">
                                    AVERAGE
                                </div>

                                <div className="font-black text-sm sm:text-base tabular-nums break-words">
                                    {formatNumber(player.average_points)}
                                </div>
                            </div>

                            <div className="bg-orange-50 rounded-lg p-2 text-center min-w-0 border-1">
                                <div className="text-[10px] sm:text-xs text-orange-600 font-semibold">
                                    LAST 3
                                </div>

                                <div className="font-black text-sm sm:text-base tabular-nums break-words">
                                    {formatNumber(player.average_last_3)}
                                </div>
                            </div>

                        </div>

                    </div>
                ))}

                {players.length === 0 && (
                    <div className="text-center p-8 text-gray-500">
                        No players found.
                    </div>
                )}

            </div>

            <div className="hidden sm:block w-full overflow-x-auto rounded-lg mt-3">

                <table className="w-full min-w-[750px] border-separate border-spacing-0.5 text-sm">

                    <thead className="sticky top-0 z-20 bg-white">

                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.field}
                                    className="
                                        border-2 px-3 py-2
                                        text-left rounded-md
                                        text-base lg:text-lg bg-white
                                    "
                                >
                                    <div className="flex items-center justify-between gap-3">

                                        <span>{column.label}</span>

                                        <button
                                            onClick={() => sortHandler(column.field)}
                                            className={`
                                                p-2 rounded-lg text-sm
                                                w-10 shrink-0
                                                flex justify-center items-center
                                                border-b-4 ring-1 ring-black
                                                transition-colors
                                                ${getSortClasses(column.field)}
                                                hover:cursor-pointer
                                            `}
                                        >
                                            {getSortIcon(column.field)}
                                        </button>

                                    </div>
                                </th>
                            ))}
                        </tr>

                    </thead>

                    <tbody>
                        {players.map((player) => (
                            <PlayerRow
                                key={player.player_id}
                                player={player}
                            />
                        ))}
                    </tbody>

                </table>

                {players.length === 0 && (
                    <div className="text-center p-8 text-gray-500">
                        No players found.
                    </div>
                )}

            </div>

        </div>
    );
}

export default PlayersList;