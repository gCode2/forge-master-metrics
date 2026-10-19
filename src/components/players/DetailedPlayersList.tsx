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
    return (
        <div className="w-full min-w-0">
            <div className="max-h-[70dvh] w-full overflow-auto rounded px-3 py-1">
                <table className="min-w-full border-separate border-spacing-0.5 text-sm">
                    <thead className="sticky top-0 z-20 bg-white">
                        <tr>
                            <th
                                rowSpan={2}
                                className="sticky left-0 z-30 min-w-36 border-2 px-3 py-2 text-center rounded-md text-xl bg-white"
                            >
                                Nickname
                            </th>

                            <th
                                colSpan={wars.length}
                                className="border-2 px-3 py-2 text-center rounded-md bg-white text-xl"
                            >
                                Wars
                            </th>
                        </tr>

                        <tr>
                            {wars.map((war) => (
                                // <th
                                //     key={war.id}
                                //     className={`${war.result === "win" ? "bg-green-500" : "bg-red-500"} min-w-16 border-2 border-black px-2 py-2 text-center text-white rounded-md`}
                                // >
                                //     {war.war_number}
                                // </th>
                                <th key={war.id} className={`${war.result === "win" ? "bg-green-500" : "bg-red-500"} min-w-16 border-2 border-black px-2 py-2 text-center text-white rounded-md`}>

                                    <div className="flex flex-row justify-between items-center px-1">
                                        <button className="flex flex-row justify-center items-center text-center">
                                            {war.war_number}
                                        </button>
                                        <button className={`${
                                    sortField === `war:${war.war_number}` ? (
                                        sortOrder === "asc" ? "bg-red-500 hover:bg-red-400 border-b-red-800" : sortOrder === "desc" ? "bg-green-500 hover:bg-green-400 border-b-green-800" : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"
                                    ) : "bg-zinc-300 hover:bg-zinc-200 border-b-zinc-700"} 
                                     p-1 rounded-lg text-sm hover:cursor-pointer w-6 flex justify-center items-center border-b-4 ring-1 ring-black text-black`} onClick={()=>sortHandler(`war:${war.war_number}`)}>
                                            {sortField === `war:${war.war_number}` ? 
                                            (sortOrder === "asc" ? <FaSortUp/> 
                                                : (sortOrder === "desc") ?  <FaSortDown/> 
                                                : <FaSort/>) 
                                            : <FaSort/>
                                            }
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
                                    className={`${player.is_member ? "bg-white" : "bg-gray-300" } sticky left-0 z-10 border-2  px-3 py-2 text-left rounded-md grid grid-cols-2 gap-2`}
                                >
                                    <div className="text-center">
                                        {player.nickname}
                                    </div>
                                    <div>
                                        <Link className="flex flex-row justify-end items-center gap-2 text-blue-500" to={`/players/${player.nickname}`}>
                                        More <MdOpenInNew/>
                                        </Link>
                                    </div>
                                    
                                </th>

                                {wars.map((war) => {
                                    const points =
                                        pointsByPlayer[player.player_id]?.[
                                            war.id
                                        ];

                                    return (
                                        <td
                                            key={war.id}
                                            title={
                                                points == null
                                                    ? "No score recorded"
                                                    : `${Number(points).toLocaleString("pl-PL")} pkt`
                                            }
                                            className="border-2 px-2 py-2 text-center tabular-nums rounded-md"
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